const Users = require('../models').User;

const addUser = user => {
  return Users.create(user);
};

const updateUser = async users => {
  users.forEach(async user => {
    console.log(user);
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
    console.log('First done');
  });
  return users;
};
const getUserByUsername = async username => {
  const user = await Users.findOne({
    where: { username },
    attributes: ['id', 'name', 'username']
  });

  return user;
};

const getUserById = async id => {
  const user = await Users.findOne({
    where: { id },
    raw: true,
    attributes: ['id', 'name', 'username', 'hh', 'ok']
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
