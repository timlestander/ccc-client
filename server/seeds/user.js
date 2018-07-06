const Users = require('../models').User;

module.exports = () => {
  return Users.bulkCreate([
    {
      id: 100,
      name: 'Tim Lestander',
      username: 'tim',
      password: 'tim',
      hh: true
    },
    {
      id: 101,
      name: 'Jakob Nilsson',
      username: 'jakob',
      password: 'jakob'
    },
    {
      id: 102,
      name: 'Jakob Danielsson',
      username: 'babben',
      password: 'babben'
    },
    {
      id: 103,
      name: 'Christoffer Johansson',
      username: 'chrisse',
      password: 'chrisse'
    },
    {
      id: 104,
      name: 'Benny Lam',
      username: 'benny',
      password: 'benny'
    },
    {
      id: 105,
      name: 'Marcus',
      username: 'marcus',
      password: 'marcus'
    }
  ]);
};
