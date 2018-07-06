const voteService = require('../services/vote');

const submitVote = async (req, res) => {
  const vote = await voteService.submitVote(req.body);
  res.send({
    success: true,
    data: vote
  });
};

module.exports = {
  submitVote
};
