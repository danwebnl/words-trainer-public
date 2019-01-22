// decide which set of keys to return

if (process.env.NODE_ENV === 'production') {
  // return the production set of keys
  module.exports = require('./prod.js');
} else {
  // return the dev keys
  module.exports = require('./dev.js');
}
