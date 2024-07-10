const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const { getAsync, setAsync } = require('../redis/index');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const currentTodos = (await getAsync('addedTodos')) ?? 0;
  await setAsync('addedTodos', Number(currentTodos) + 1);
  res.send(todo);
});

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* GET todo. */
router.get('/:id', findByIdMiddleware, async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
router.put('/:id', findByIdMiddleware, async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, req.body, {
    new: true,
  });
  res.json(updatedTodo);
});

/* DELETE todo. */
router.delete('/:id', findByIdMiddleware, async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

module.exports = router;
