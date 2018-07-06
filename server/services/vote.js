const Votes = require('../models').Vote;

const submitVote = async values => {
  const vote = await Votes.create(values);
  return vote;
};

module.exports = {
  submitVote
};
