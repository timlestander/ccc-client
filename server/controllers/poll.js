const pollService = require('../services/poll');
const asyncErrorHandler = require('../middlewares/async').asyncError;

const createPoll = asyncErrorHandler(async (req, res, next) => {
  const poll = await pollService.createPoll(req.body);
  res.send({
    data: poll,
    success: true
  });
});

const getAllPolls = asyncErrorHandler(async (req, res, next) => {
  const polls = await pollService.getAllPolls();
  res.send({
    success: true,
    data: polls
  });
});

const getPollById = asyncErrorHandler(async (req, res, next) => {
  const poll = await pollService.getPollById(req.params.id);
  res.send({
    success: true,
    data: poll
  });
});

module.exports = {
  getAllPolls,
  getPollById,
  createPoll
};
