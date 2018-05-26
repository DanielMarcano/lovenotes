const expect = require('expect');
const request = require('supertest');
const { app } = require('../../server');
const { Todo } = require('../models/todo');

beforeEach(async () => {
  await Todo.remove();
  await new Todo({
    text: 'This is me, this is real',
    title: 'Ohana means family',
  }).save();
  await new Todo({
    text: 'Go do it',
    title: 'Gotta buy some grocsss',
  }).save();
});

describe('GET /todos', () => {
  it('should return all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});

describe('POST /todos', () => {
  it('should add a new todo', async () => {
    await request(app)
      .post('/todos')
      .send({
        title: 'Say goodbye to him',
        text: 'More on that later...',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.title).toBeTruthy();
        expect(res.body.text).toBeTruthy();
      });
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo', async () => {
    const todos = await Todo.find();

    await request(app)
      .delete(`/todos/${todos[0]._id}`)
      .expect(200)
      .expect(async (res) => {
        expect(todos[0]).toMatchObject(res.body);
        const all = await Todo.find();
        expect(all.length).toBe(1);
      });
  });
});

describe('PATCH /todos/:id', () => {
  it('should remove completedAt if completed is not true', async () => {
    const todos = await Todo.find();

    await request(app)
      .patch(`/todos/${todos[0]._id}`)
      .send({
        title: 'La guacharaca',
        text: 'Loca',
        completed: false,
      })
      .expect(200)
      .expect((res) => {
        expect(todos[0].title).not.toMatch(res.body.title);
        expect(todos[0].text).not.toMatch(res.body.text);
        expect(res.body.completed).toBeFalsy();
        expect(res.body.completedAt).toBeFalsy();
      });
  });

  it('should update a todo and give it a completed and completedAt', async () => {
    const todos = await Todo.find();

    await request(app)
      .patch(`/todos/${todos[0]._id}`)
      .send({
        title: 'La guacharaca',
        text: 'Loca',
        completed: true,
      })
      .expect(200)
      .expect((res) => {
        expect(todos[0].title).not.toMatch(res.body.title);
        expect(todos[0].text).not.toMatch(res.body.text);
        expect(res.body.completed).toBe(true);
        expect(typeof res.body.completedAt).toBe('string');
      });
  });
});