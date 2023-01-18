const express = require('express');
const path = require('node:path');
const { v4: uuid } = require('uuid');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/places.json');

router.post('/', (req, res) => {
  const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;
  const description = req?.body?.description?.length !== 0 ? req.body.description : undefined;

  if (!name || !description) return res.sendStatus(400);

  const places = parse(jsonDbPath, []);
  const id = uuid();
  const newPlace = {
    id,
    name,
    description,
  };

  places.push(newPlace);
  serialize(jsonDbPath, places);
  return res.json({ id });
});

router.post('/favourite', (req, res) => {
  const { user, place } = req.body;

  if (!user || !place) return res.sendStatus(400);

  const places = parse(jsonDbPath, []);
  const place0 = places.find((p) => p.id === place);
  if (!place0.favourites) place0.favourites = [];
  if (place0.favourites.includes(user)) return res.sendStatus(400);
  place0.favourites.push(user);
  serialize(jsonDbPath, places);
  return res.json({});
});

module.exports = router;
