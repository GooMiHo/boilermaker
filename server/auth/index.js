const router = require('express').Router();
const User = require('../db/models/user');

//router requests start with /auth/
// router.post('/signup', (req, res, next) => {
//   User.create(req.body)
//   .then(user => {
//     req.login(user, (err) => {
//       if(err) next(err);
//       else res.json(user);
//     });
//   })
//   .catch(next);
// });

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send('User not found!');
      else if (!user.correctPassword(req.body.password)) res.send(401).send('Incorrect username or password');
      else {
        req.login(user, (err) => {
          if (err) next(err);
          else res.json(user);
        });
      }
    });
});

//changed from delete to post to allow redirect
router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.status(204).redirect('/')
})

router.get('/me', (req, res, next) => {
  res.json(req.user)
})

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
