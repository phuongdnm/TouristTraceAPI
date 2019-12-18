const { createPool } = require('mysql');

const pool = createPool({
  port: '/var/run/mysqld/mysqld.sock',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 20,
  multipleStatements: true
});

module.exports = pool;
