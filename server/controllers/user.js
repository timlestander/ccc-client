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

const hhUpdate = asyncErrorHandler(async (req, res, next) => {
  //TODO sanity check body
  await userService.hhUpdate(req.body);
  res.send({
    success: true
  });
});

const updateUser = asyncErrorHandler(async (req, res, next) => {
  console.log(req.params.id, req.body);
  await userService.updateUser(req.params.id, req.body);
  res.send({
    success: true
  });
});

const deleteUser = asyncErrorHandler(async (req, res, next) => {
  const user = await userService.deleteUser(req.params.id);
  res.send({
    success: true
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  hhUpdate,
  updateUser,
  deleteUser
};
