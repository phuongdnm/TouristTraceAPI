const pool = require('../../config/database');

// Service for registering user
const create = (data, callBack) => {
  pool.query(
    `INSERT INTO registration(username, password) VALUES (?, ?); INSERT INTO clients(firstName, lastName) VALUES ('Somebody' , 'Somebody');`,
    [data.username, data.password],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
}

// Service for updating user
const updateInfoById = (data, callBack) => {
  pool.query(
    `UPDATE clients SET firstName=?, lastName=?, birthday=?, city=?, country=?, nationality=?, email=?, phone=? WHERE client_id=?`,
    [
      data.firstName,
      data.lastName,
      data.birthday,
      data.city,
      data.country,
      data.nationality,
      data.email,
      data.phone,
      data.id
    ],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
}

// Service for get all clients
const getClients =  callBack => {
  pool.query(`SELECT * FROM clients`, [], (error, results, fields) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
}

// Service for get infor of 1 client
const getClientByClientId = (id, callBack) => {
  pool.query(
    `SELECT * FROM clients WHERE client_id=?`,
    [id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
}

// Service for logging in
const getClientByUsername = (username, callBack) => {
  pool.query(
    `SELECT * FROM registration WHERE username=?`,
    [username],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
}

// Service for saving history
const saveHistory = (data, callBack) => {
  pool.query(
    `INSERT INTO history(latitude, longitude, arrival_at, leave_at, client_id) VALUES ?`, 
    [data], 
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  )
}

module.exports = {
  create,
  updateInfoById,
  getClients,
  getClientByClientId,
  getClientByUsername,
  saveHistory
};
