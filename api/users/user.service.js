const pool = require('../../config/database');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO registration(username, password) VALUES (?, ?)`,
      [data.username, data.password],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
