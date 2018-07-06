const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const Users = require('../models').User;
const config = require('../config');

const authenticate = params => {
  return Users.findOne({
    where: {
      username: params.username
    },
    raw: true
  }).then(user => {
    console.log(user);
    if (!user) throw new Error('Authentication failed. User not found');
    if (params.password !== user.password)
      throw new Error('Authentication failed. Wrong password');

    const payload = {
      username: user.username,
      id: user.id,
      name: user.name,
      ok: user.ok
    };

    var token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.tokenExpireTime
    });

    return token;
  });
};

module.exports = {
  authenticate
};
