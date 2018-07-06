const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  hh: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ok: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

const Poll = sequelize.define('poll', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Option = sequelize.define('option', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Vote = sequelize.define('vote', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ok: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Poll.belongsTo(User);
Poll.hasMany(Option);

User.hasMany(Vote);
Option.hasMany(Vote);

module.exports = {
  User,
  Poll,
  Option,
  Vote
};
