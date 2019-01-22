const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const moment = require('moment');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const Word = mongoose.model('words');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => res.redirect('/')
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.use(cookieParser());
  app.get('/api/logout', (req, res) => {
    // for JWT user demo
    delete req.user;
    delete res.clearCookie('jwtToken');
 
    req.logout();
    res.redirect('/');
  });
};
