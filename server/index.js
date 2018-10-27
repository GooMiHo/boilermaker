const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { db, User }  = require('./db')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({db: db})


// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//sync to create session table
dbStore.sync()

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))

const passport = require('passport')

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch (err) {
    done(err)
  }
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done)
})

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));



app.use('/api', require('./api'));

// authentication router
app.use('/auth', require('./auth'));

// all GET requests that aren't to an API route, send the index.html!
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// Handle 500s (Error handling endware)
app.use(function (err, req, res, next) {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

db.sync({force: true})
  .then(function() {
    app.listen(PORT, () => console.log(
      `Listening on port ${PORT} http://localhost:3000`
    ))
  })
