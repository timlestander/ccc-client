const Options = require('../models').Option;

module.exports = () => {
  return Options.bulkCreate([
    {
      id: 100,
      text: 'Hambugare',
      pollId: 100
    },
    {
      id: 101,
      text: 'Pizza',
      pollId: 100
    },
    {
      id: 102,
      text: 'Bunkern',
      pollId: 101
    },
    {
      id: 103,
      text: 'Hemma',
      pollId: 101
    },
    {
      id: 104,
      text: 'Ja',
      pollId: 102
    },
    {
      id: 105,
      text: 'Nej',
      pollId: 102
    },
    {
      id: 106,
      text: 'Kanske',
      pollId: 103
    },
    {
      id: 107,
      text: 'Nej',
      pollId: 103
    }
  ]);
};
