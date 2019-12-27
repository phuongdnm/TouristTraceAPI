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

const checkUsername = (data, callBack) => {
  pool.query(
    `SELECT username FROM registration WHERE username = ? LIMIT 1`,
    [data],
    (error, results, fields) => {
      if (error){
        return callBack(error);
      }
      return callBack(null, results);
    }
  )
}

// Service for updating user
const updateInfoById = (data, id, callBack) => {
  pool.query(
    `UPDATE clients SET firstName=?, lastName=?, birthday=?, city=?, country=?, nationality=?, email=?, phone=? WHERE client_id=?; SELECT * FROM clients WHERE client_id=?`,
    [
      data.firstName,
      data.lastName,
      data.birthday,
      data.city,
      data.country,
      data.nationality,
      data.email,
      data.phone,
      id,
      id
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
    `SELECT *, registration.username, registration.password 
    FROM clients 
    INNER JOIN registration 
    ON registration.id = clients.client_id
    WHERE username=?`,
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

// Service for getting user's history
const getHistoryByClientId = (id, callback) => {
  pool.query(`SELECT latitude, longitude, arrival_at, leave_at FROM history WHERE client_id = ?`,
  [id],
  (error, results, fields) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  } 
    
  )
}

module.exports = {
  create,
  checkUsername,
  updateInfoById,
  getClients,
  getClientByClientId,
  getClientByUsername,
  saveHistory,
  getHistoryByClientId
};
