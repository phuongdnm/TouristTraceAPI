const {
  create,
  checkUsername,
  updateInfoById,
  getClients,
  getClientByClientId,
  getClientByUsername,
  saveHistory,
  getHistoryByClientId
} = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const checkUniqueUsername = usernameInput => {
  return new Promise(resolve => {
    checkUsername(usernameInput, (err, result) => {
      // If result[0] exist, it means the username is already taken
      result[0] ? resolve(result[0].username) : resolve(undefined);
    });
  });
};

const createUser = async (req, res) => {
  const body = req.body;

  // check unique username
  const isNotAvailable = await checkUniqueUsername(body.username);
  if (isNotAvailable) {
    return res.status(406).json({
      success: false,
      message: 'Your username has been taken!'
    });
  } 

  // encrypt password
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  create(body, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: fasle,
        message: 'Database connection error!'
      });
    }
    return res.status(201).json({
      success: true,
      client_id: results[0].insertId
    });
  });
};

const updateUserInfo = (req, res) => {
  const body = req.body;
  updateInfoById(body, (err, results) => {
    if (err) {
      console.log(err);
      return false;
    }
    // If the results object is undefined
    if (!results) {
      console.log(results);
      console.log(results);
      return res.status(404).json({
        success: false,
        message: 'Failed to update user info!'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Update info successfully!'
    });
  });
};

const getAllClients = (req, res) => {
  getClients((err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.status(200).json({
      success: true,
      data: results
    });
  });
};

const getOneClient = (req, res) => {
  const id = req.params.id;

  getClientByClientId(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.status(404).json({
        success: false,
        message: 'Record not found!'
      });
    }
    return res.status(200).json({
      success: true,
      data: results
    });
  });
};

const logIn = (req, res) => {
  const body = req.body;
  getClientByUsername(body.username, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (!results) {
      return res.status(406).json({
        success: false,
        data: 'Invalid email or password!'
      });
    }
    const checkResult = compareSync(body.password, results.password);
    if (checkResult) {
      results.password = undefined;
      const jsontoken = sign({ result: results }, process.env.token_key, {
        expiresIn: '1h'
      });
      return res.status(200).json({
        success: true,
        message: 'Login successfully!',
        token: jsontoken
      });
    } else {
      return res.status(406).json({
        success: false,
        data: 'Your password is not correct!'
      });
    }
  });
};

const saveUserHistory = (req, res) => {
  const userId = req.params.id;
  const body = req.body;

  // convert array of objects to array of arrays for queries
  let data_array = [];
  body.forEach(element => {
    let item_array = Object.values(element);
    item_array.push(userId);
    data_array.push(item_array);
  });

  saveHistory(data_array, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.status(200).json({
      success: true,
      data: results
    });
  });
};

const getUserHistory = (req, res) => {
  const userId = req.params.id;

  getHistoryByClientId(userId, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.status(404).json({
        success: false,
        message: 'History not found!'
      });
    }
    return res.status(200).json({
      success: true,
      data: results
    });
  });
};

module.exports = {
  createUser,
  updateUserInfo,
  getAllClients,
  getOneClient,
  logIn,
  saveUserHistory,
  getUserHistory
};
