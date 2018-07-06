const Polls = require('../models').Poll;
const Options = require('../models').Option;
const Votes = require('../models').Vote;

const createPoll = async pollData => {
  const { poll, options } = pollData;
  const result = await Polls.create(
    {
      ...poll,
      options: options
    },
    {
      include: [Options]
    }
  );
  return result;
};

const getAllPolls = async () => {
  const polls = await Polls.findAll({
    include: [
      {
        model: Options,
        include: [
          {
            model: Votes
          }
        ]
      }
    ]
  });
  return polls;
};

const getPollById = async id => {
  const poll = await Polls.findOne({
    where: {
      id: id
    },
    include: [
      {
        model: Options,
        include: [
          {
            model: Votes
          }
        ]
      }
    ]
  });
  return poll;
};

module.exports = {
  getAllPolls,
  getPollById,
  createPoll
};
