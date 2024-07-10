const express = require('express');
const router = express.Router();

const configs = require('../util/config');
const { getAsync } = require('../redis');

let visits = 0;

/* GET addedTodos */
router.get('/statistics', async (req, res) => {
  res.json({ added_todos: Number((await getAsync('addedTodos')) ?? 0) });
});

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

module.exports = router;
