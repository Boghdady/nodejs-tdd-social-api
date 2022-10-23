const express = require('express');
const User = require('../src/models/user');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

app.post('/api/v1/users', function (req, res) {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = { ...req.body, password: hash };
    User.create(user).then(() => {
      return res.status(201).send({ message: 'User Created successfully' });
    });
  });
});

module.exports = app;
