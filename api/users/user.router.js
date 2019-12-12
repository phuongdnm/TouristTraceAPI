const {
  createUser,
  updateUserInfo,
  getAllClients,
  getOneClient,
  logIn
} = require('./user.controller');
const { checkToken } = require('../../auth/token_validation');

const router = require('express').Router();

// POST request to create a new user
router.post('/' ,createUser);
router.patch('/', updateUserInfo);
router.get('/', getAllClients);
router.get('/:id', checkToken, getOneClient);
router.post('/login', logIn);

module.exports = router;
