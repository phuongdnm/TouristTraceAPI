const { createUser, updateUserInfo, getAllClients, getOneClient } = require('./user.controller');

const router = require('express').Router();

// POST request to create a new user
router.post('/', createUser);
router.patch('/', updateUserInfo);
router.get('/', getAllClients);
router.get('/:id', getOneClient);

module.exports = router;
