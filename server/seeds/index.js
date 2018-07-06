const userSeed = require('../seeds/user');
const pollSeed = require('../seeds/poll');
const optionSeed = require('../seeds/option');

module.exports = () => {
  // Begin with seeding all leaves without associations
  return userSeed()
    .then(() => {
      // Since polls depends on user we need to wait
      pollSeed();
    })
    .then(() => {
      optionSeed();
    })
    .then(() => {
      console.log('Successfully seeded database');
    });
};
