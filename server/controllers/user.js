const userService = require('../services/user');

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.send(users);
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.send(user);
};

const updateUser = async (req, res) => {
  //TODO sanity check body
  await userService.updateUser(req.body);
  res.send({
    success: true
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser
};
