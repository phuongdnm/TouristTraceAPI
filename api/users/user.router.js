const {
  createUser,
  updateUserInfo,
  getAllClients,
  getOneClient,
  logIn,
  adminLogin,
  saveUserHistory,
  getUserHistory
} = require('./user.controller');
const { checkToken } = require('../../auth/token_validation');

const router = require('express').Router();

router.post('/' ,createUser);
router.put('/:id',checkToken, updateUserInfo);
router.get('/', getAllClients);
router.get('/:id', checkToken, getOneClient);
router.post('/login', logIn);
router.post('/admin', adminLogin);
router.post('/:id/history', checkToken, saveUserHistory);
router.get('/:id/history', checkToken, getUserHistory)

module.exports = router;
