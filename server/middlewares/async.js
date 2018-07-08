const asyncError = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    res.send({
      success: false,
      error: error
    });
  });
};

module.exports = {
  asyncError
};
