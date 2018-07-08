const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models').User;
const config = require('../config');
const asyncErrorHandler = require('../middlewares/async').asyncError;

const authenticate = async params => {
  const user = await Users.findOne({
    where: {
      username: params.username
    },
    raw: true
  });

  if (!user) {
    res.send({
      success: false,
      message: 'Inloggningen misslyckades. Användaren finns inte.'
    });
  } else if (!bcrypt.compareSync(params.password, user.password)) {
    res.send({
      success: false,
      message: 'Inloggningen misslyckades. Lösenordet stämmer inte.'
    });
  }

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
};

module.exports = {
  authenticate
};
