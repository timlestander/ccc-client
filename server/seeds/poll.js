const Polls = require('../models').Poll;
const Options = require('../models').Option;

module.exports = () => {
  return Polls.bulkCreate([
    {
      id: 100,
      question: 'Vad ska vi äta?',
      userId: 100
    },
    {
      id: 101,
      question: 'Vart ska vi kröka?',
      userId: 100
    },
    {
      id: 102,
      question: 'Ska babben åka hem?',
      userId: 101
    },
    {
      id: 103,
      question: 'SKA DU HA ELLER?',
      userId: 102
    }
  ]);
};
