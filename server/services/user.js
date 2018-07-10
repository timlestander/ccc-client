const Users = require('../models').User;

const addUser = user => {
  return Users.create(user);
};

const hhUpdate = async users => {
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

const updateUser = async (id, data) => {
  console.log(id, data);
  await Users.update(data, { where: { id: id } });
  return;
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

const deleteUser = id => {
  const user = Users.destroy({
    where: {
      id: id
    }
  });
  return user;
};

module.exports = {
  addUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  hhUpdate,
  updateUser,
  deleteUser
};
