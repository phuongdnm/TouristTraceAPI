const { create } = require('./user.service');
const { genSaltSync, hashSync } = require('bcrypt');

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    // encrypt password
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, ressults) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: fasle,
          message: 'Database connection error'
        });
      }
      return res.status(200).json({
        success: true,
        data: ressults
      })
    });
  }
};
