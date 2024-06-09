const express = require('express');
const userRoutes = express.Router();
const User = require('../models/User');

userRoutes.get('/', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

userRoutes.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user);
});

userRoutes.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();

  res.json(user);
});

userRoutes.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(user);
});

userRoutes.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.json(user);
});

userRoutes.post('/:id/friends/:friendId', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        friends: req.params.friendId,
      },
    },
    {
      new: true,
    }
  );

  res.json(user);
});

userRoutes.delete('/:id/friends/:friendId', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        friends: req.params.friendId,
      },
    },
    {
      new: true,
    }
  );

  res.json(user);
});

module.exports = userRoutes;
