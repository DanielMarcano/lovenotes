const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: String,
    default: Date.now,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      const copy = ret;
      delete copy._id;
    },
  },
});
todoSchema.methods.toJSON = function () {
  const todo = this.toObject();
  delete todo._id;
  return todo;
};

module.exports.Todo = mongoose.model('Todo', todoSchema);