const authController = require('./controllers/auth');
const authMiddleware = require('./middlewares/auth');
const userController = require('./controllers/user');
const pollController = require('./controllers/poll');
const voteController = require('./controllers/vote');

module.exports.set = app => {
  // Public routes
  app.post('/login', authController.login);
  app.post('/register', authController.register);

  // Protected routes
  app.get('/users', authMiddleware.checkAuth, userController.getAllUsers);
  app.get('/user/:id', authMiddleware.checkAuth, userController.getUserById);
  app.put('/users', userController.updateUser);
  app.get('/polls', authMiddleware.checkAuth, pollController.getAllPolls);
  app.post('/poll', authMiddleware.checkAuth, pollController.createPoll);
  app.get('/poll/:id', authMiddleware.checkAuth, pollController.getPollById);
  app.post('/vote', authMiddleware.checkAuth, voteController.submitVote);
};
