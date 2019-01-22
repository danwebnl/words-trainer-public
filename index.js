const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('./config/config');
require('./config/database.config');
const keys = require('./config/keys');
require('./models/word.model');
require('./models/user.model');
require('./services/passport');

const app = express();

if (process.env.NODE_ENV === 'production') {
} else {
  // CORS on ExpressJS
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
  });
}

// set demo user from cookie
app.use(cookieParser());
app.use((req, res, next) => {
  const { jwtToken } = req.cookies;
  if (jwtToken) {
    const user = jwt.verify(jwtToken, keys.cookieKey);
    if (user) {
      req.user = user;
    }
  }
  next();
});

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //valid for 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/user.routes')(app);
require('./routes/word.routes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/public'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
  });
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('server is up on port ' + PORT);
});

module.exports.app = app;
