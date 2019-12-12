const {
  create,
  updateInfoById,
  getClients,
  getClientByClientId,
  getClientByUsername
} = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const createUser = (req, res) => {
  const body = req.body;
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
    return res.status(200).json({
      success: true,
      data: results
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
      return res.status(401).json({
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
      return res.status(401).json({
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
      return res.status(401).json({
        success: false,
        data: 'Invalid email or password!'
      });
    }
    const checkResult = compareSync(body.password, results.password);
    if (checkResult) {
      results.password = undefined;
      const jsontoken = sign({ result: results }, 'qwe1234', {
        expiresIn: '1h'
      });
      return res.status(200).json({
        success: true,
        message: 'Login successfully!',
        token: jsontoken
      });
    } else {
      return res.status(401).json({
        success: false,
        data: 'Your password is not correct!'
      });
    }
  });
};

module.exports = {
  createUser,
  updateUserInfo,
  getAllClients,
  getOneClient,
  logIn
};
