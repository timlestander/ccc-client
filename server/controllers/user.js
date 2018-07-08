const userService = require('../services/user');
const asyncErrorHandler = require('../middlewares/async').asyncError;

const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await userService.getAllUsers();
  res.send({
    success: true,
    data: users
  });
});

const getUserById = asyncErrorHandler(async (req, res, next) => {
  const user = await userService.getUserById(req.params.id);
  res.send({
    success: true,
    data: user
  });
});

const updateUser = asyncErrorHandler(async (req, res, next) => {
  //TODO sanity check body
  await userService.updateUser(req.body);
  res.send({
    success: true
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser
};
