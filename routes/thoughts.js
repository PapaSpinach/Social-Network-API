const express = require('express');
const thoughtRoutes = express.Router();
const Thought = require('../models/Thought');

thoughtRoutes.get('/', async (req, res) => {
  const thoughts = await Thought.find();

  res.json(thoughts);
});

thoughtRoutes.get('/:id', async (req, res) => {
  const thought = await Thought.findById(req.params.id);

  res.json(thought);
});

thoughtRoutes.post('/', async (req, res) => {
  const thought = new Thought(req.body);
  await thought.save();

  res.json(thought);
});

thoughtRoutes.put('/:id', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(thought);
});

thoughtRoutes.delete('/:id', async (req, res) => {
  const thought = await Thought.findByIdAndDelete(req.params.id);

  res.json(thought);
});

thoughtRoutes.post('/:id/reactions', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        reactions: req.body,
      },
    },
    {
      new: true,
    }
  );

  res.json(thought);
});

thoughtRoutes.delete('/:id/reactions/:reactionId', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        reactions: { reactionId: req.params.reactionId },
      },
    },
    {
      new: true,
    }
  );

  res.json(thought);
});

module.exports = thoughtRoutes;
