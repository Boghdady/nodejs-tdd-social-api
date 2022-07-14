const express = require('express');

const app = express();

app.post('/api/v1/users', function (req, res) {
  return res.status(201).send({ message: 'User Created successfully' });
});

module.exports = app;
