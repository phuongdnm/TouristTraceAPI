const {createUser} = require('./user.controller');

const router = require('express').Router();

// POST request to create a new user
router.post('/', createUser);

module.exports = router;