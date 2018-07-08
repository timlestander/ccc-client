const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('../services/user');
const asyncErrorHandler = require('../middlewares/async').asyncError;

const login = asyncErrorHandler(async (req, res, next) => {
  const user = await userService.getUserByUsername(req.body.username);

  if (!user) {
    res.send({
      success: false,
      title: 'Inloggningen misslyckades.',
      message: 'Det finns ingen användare med detta namn.'
    });
  } else if (!bcrypt.compareSync(req.body.password, user.password)) {
    res.send({
      success: false,
      title: 'Inloggningen misslyckades',
      message: 'Lösenordet stämmer inte.'
    });
  } else {
    const payload = {
      username: user.username,
      id: user.id,
      name: user.name,
      ok: user.ok,
      hh: user.hh
    };

    var token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.tokenExpireTime
    });

    res.send({
      success: true,
      data: token
    });
  }
});

const register = asyncErrorHandler(async (req, res, next) => {
  const exists = await userService.getUserByUsername(req.body.username);
  if (exists) {
    res.send({
      success: false,
      title: 'Registreringen misslyckades',
      message: 'En användare med detta användarnamn finns redan.'
    });
  } else {
    let user = req.body;
    const hashedPassword = bcrypt.hashSync(user.password, config.saltRounds);
    user.password = hashedPassword;
    await userService.addUser(user);

    res.send({
      success: true,
      title: 'Registreringen lyckades',
      message: 'Din användare är skapad. Varsågod att logga in, bitch.'
    });
  }
});

module.exports = {
  login,
  register
};
