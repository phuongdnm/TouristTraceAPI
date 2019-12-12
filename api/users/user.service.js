const pool = require('../../config/database');

module.exports = {
  create: (data, callBack) => {
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
  },
  updateInfoById: (data, callBack) => {
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
  },
  getClients: callBack => {
    pool.query(`SELECT * FROM clients`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getClientByClientId: (id, callBack) => {
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
};
