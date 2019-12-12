const { createUser, updateUserInfo } = require('./user.controller');

const router = require('express').Router();

// POST request to create a new user
router.post('/', createUser);
router.patch('/', updateUserInfo);

module.exports = router;
