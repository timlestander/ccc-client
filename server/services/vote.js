const Votes = require('../models').Vote;
const Users = require('../models').User;

const submitVote = async values => {
  const user = await Users.findOne({ where: { id: values.userId } });
  const vote = await Votes.create({ ...values, ok: user.ok });
  return vote;
};

module.exports = {
  submitVote
};
