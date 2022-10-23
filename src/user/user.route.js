const express = require('express');
const { createUser } = require('./user.service');

const router = express.Router();

router.post('/api/v1/users', createUser);

module.exports = router;
