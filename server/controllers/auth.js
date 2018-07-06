const config = require('../config');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt-nodejs');
const authService = require('../services/auth');
const userService = require('../services/user');

function login(req, res) {
  return authService
    .authenticate(req.body)
    .then(token => {
      res.send({
        success: true,
        data: { token }
      });
    })
    .catch(err => {
      res.send({
        success: false,
        message: err.message // Improve error handling
      });
    });
}

function register(req, res) {
  return userService.getUserByUsername(req.body.username || '').then(exists => {
    if (exists) {
      return res.send({
        success: false,
        message: 'Registration failed. User with this username already exists.'
      });
    }
    let user = req.body;
    return userService
      .addUser(user)
      .then(() =>
        res.send({ success: true, message: 'User successfully created.' })
      );
  });
}

module.exports = {
  login,
  register
};
