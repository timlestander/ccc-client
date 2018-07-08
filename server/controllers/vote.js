const voteService = require('../services/vote');
const asyncErrorHandler = require('../middlewares/async').asyncError;

const submitVote = asyncErrorHandler(async (req, res, next) => {
  const vote = await voteService.submitVote(req.body);
  res.send({
    success: true,
    data: vote
  });
});

module.exports = {
  submitVote
};
