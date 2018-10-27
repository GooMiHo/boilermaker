const router = require('express').Router();

//all router requests start with /api
//router.use('/something', require('./someplace'))


router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
