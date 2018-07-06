const jwt = require('jsonwebtoken');
const config = require('../config');

const checkAuth = (req, res, next) => {
  var token = req.headers['authorization'].split(' ')[1];
  if (!token)
    return res
      .status(403)
      .send({ success: false, message: 'Access denied. No token provided.' });

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ success: false, message: 'Failed to authenticate token' });
    }

    next();
  });
};

module.exports = {
  checkAuth
};
