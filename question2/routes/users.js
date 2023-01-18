const express = require('express');
const path = require('node:path');
const { v4: uuid } = require('uuid');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/users.json');

router.post('/', (req, res) => {
  const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;

  if (!name || !email) return res.sendStatus(400);

  const users = parse(jsonDbPath, []);
  if (users.find((user) => user.email === email)) return res.sendStatus(400);

  const id = uuid();
  const newUser = {
    id,
    name,
    email,
  };
  users.push(newUser);
  serialize(jsonDbPath, users);
  return res.json({ id });
});

module.exports = router;
