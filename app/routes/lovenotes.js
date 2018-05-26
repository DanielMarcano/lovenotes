const _ = require('lodash');
const { Todo } = require('../models/todo');
const { validateObjectId } = require('../utilities/utilities');
const asyncHandler = require('express-async-handler');
const Router = require('express').Router();

const isLoggedIn = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('homeMessage', 'You have not logged in yet');
  res.redirect('/');
});

module.exports = function (passport) {
  const localSignUp = asyncHandler(async (req, res, next) => {
    passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true,
    })(req, res, next);
  });

  const localLogin = asyncHandler(async (req, res, next) => {
    passport.authenticate('local-login', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true,
    })(req, res, next);
  });

  Router.route('/todos')
    .get(asyncHandler(async (req, res, next) => {
      const todos = await Todo.find();
      res.status(200).json(todos);
      next();
    }))
    .post(asyncHandler(async (req, res, next) => {
      const todo = new Todo(_.pick(req.body, ['title', 'text']));
      await todo.save();
      res.status(201).json(todo);
      next();
    }));

  Router.route('/todos/:id')
    .delete(asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      if (validateObjectId(id)) {
        const removedTodo = await Todo.findByIdAndRemove(id);
        res.status(200).json(removedTodo);
      } else {
        throw new Error('Invalid id');
      }
      next();
    }))
    .patch(asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      if (validateObjectId(id)) {
        const todo = _.pick(req.body, ['title', 'text', 'completed']);
        if (todo.completed === true) {
          todo.completedAt = new Date().toString();
        } else {
          todo.completed = false;
          todo.completedAt = null;
        }
        const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });
        res.status(200).json(updatedTodo);
      } else {
        throw new Error('Invalid id');
      }
      next();
    }));

  Router.route('/login')
    .get(asyncHandler(async (req, res) => {
      res.render('login.ejs', { message: req.flash('loginMessage') });
    }))
    .post(localLogin);

  Router.route('/signup')
    .get(asyncHandler(async (req, res) => {
      res.render('signup.ejs', { message: req.flash('signupMessage') });
    }))
    .post(localSignUp);

  Router.get('/profile', isLoggedIn, asyncHandler(async (req, res) => {
    res.render('profile.ejs', {
      user: req.user,
    });
  }));

  Router.get('/logout', asyncHandler(async (req, res) => {
    req.logout();
    res.redirect('/');
  }));

  Router.get('/', asyncHandler(async (req, res) => {
    res.render('index.ejs', { message: req.flash('homeMessage') });
  }));

  return Router;
};