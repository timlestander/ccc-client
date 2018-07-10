const authController = require('./controllers/auth');
const authMiddleware = require('./middlewares/auth');
const userController = require('./controllers/user');
const pollController = require('./controllers/poll');
const voteController = require('./controllers/vote');

module.exports.set = app => {
  // Public routes
  app.post('/api/login', authController.login);
  app.post('/api/register', authController.register);

  // Protected routes
  app.get('/api/users', authMiddleware.checkAuth, userController.getAllUsers);
  app.get(
    '/api/user/:id',
    authMiddleware.checkAuth,
    userController.getUserById
  );
  app.put('/api/users', userController.hhUpdate);
  app.get('/api/polls', authMiddleware.checkAuth, pollController.getAllPolls);
  app.post('/api/poll', authMiddleware.checkAuth, pollController.createPoll);
  app.get(
    '/api/poll/:id',
    authMiddleware.checkAuth,
    pollController.getPollById
  );
  app.post('/api/vote', authMiddleware.checkAuth, voteController.submitVote);
  app.put('/api/user/:id', authMiddleware.checkAuth, userController.updateUser);
  app.delete(
    '/api/user/:id',
    authMiddleware.checkAuth,
    userController.deleteUser
  );
  app.delete(
    '/api/poll/:id',
    authMiddleware.checkAuth,
    pollController.deletePoll
  );
};
