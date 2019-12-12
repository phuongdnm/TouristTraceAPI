const jwt = require('jsonwebtoken');

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get('authorization');
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, 'qwe1234', (err, decoded) => {
        if (err) {
          return res.status(200).json({
            success: false,
            message: 'Invalid token...'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: true,
        message: 'Access denied! Unauthorized User!'
      });
    }
  }
};
