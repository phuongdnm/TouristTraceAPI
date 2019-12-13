const {
  createUser,
  updateUserInfo,
  getAllClients,
  getOneClient,
  logIn
} = require('./user.controller');
const { checkToken } = require('../../auth/token_validation');

const router = require('express').Router();

router.post('/' ,createUser);
router.patch('/:id',checkToken, updateUserInfo);
router.get('/', getAllClients);
router.get('/:id', checkToken, getOneClient);
router.post('/login', logIn);

module.exports = router;
