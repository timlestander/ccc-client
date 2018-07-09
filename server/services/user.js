const Users = require('../models').User;

const addUser = user => {
  return Users.create(user);
};

const updateUser = async users => {
  users.forEach(async user => {
    await Users.update(
      {
        hh: user.hh,
        ok: user.ok
      },
      {
        where: {
          id: user.id
        }
      }
    );
  });
  return users;
};
const getUserByUsername = async username => {
  const user = await Users.findOne({
    where: { username },
    raw: true,
    attributes: ['id', 'name', 'username', 'hh', 'ok', 'password', 'admin']
  });

  return user;
};

const getUserById = async id => {
  const user = await Users.findOne({
    where: { id },
    raw: true,
    attributes: ['id', 'name', 'username', 'hh', 'ok', 'admin']
  });

  return user;
};

const getAllUsers = async () => {
  const users = await Users.findAll();
  return users;
};

module.exports = {
  addUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  updateUser
};
