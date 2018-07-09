const Users = require('../models').User;

module.exports = () => {
  return Users.bulkCreate([
    {
      id: 100,
      name: 'Tim Lestander',
      username: 'tim',
      password: '$2a$04$cRf93fohCBmADnjhwKVAiO7Ei5MjPpPigJFbfzerm0eZJXN0teIMq',
      hh: true,
      admin: true
    },
    {
      id: 101,
      name: 'Jakob Nilsson',
      username: 'jakob',
      password: '$2a$04$rlggLm0CBv.IM2DH8CAA2.oOO1ek9VflJLd9dtAVzzWwhV0Nxi3Xm'
    },
    {
      id: 102,
      name: 'Jakob Danielsson',
      username: 'babben',
      password: '$2a$04$mxXoeA9aNyAzy9eSErKYJua1wnQyRO93SFkfzHIpRoiGgrp2yE2nW'
    },
    {
      id: 103,
      name: 'Christoffer Johansson',
      username: 'chrisse',
      password: '$2a$04$gj4uV9sL6bHtJPo2oO/kCOvD0Jv6h6eHkJrNsG0S2rUsm0rlSJzve'
    },
    {
      id: 104,
      name: 'Benny Lam',
      username: 'benny',
      password: '$2a$04$GLMQ8QMInPLqP.MyH4liEe7ZudbFzojK0.H4KMbHH6mFpOYgRDt7i'
    },
    {
      id: 105,
      name: 'Marcus',
      username: 'marcus',
      password: '$2a$04$5fDHaTP7IZTxEsO1ZaqnnOSM.2r9.yncZwIGhRRKCSQEnWbZz1klK'
    }
  ]);
};
