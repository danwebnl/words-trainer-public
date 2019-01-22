const mongoose = require('mongoose');
const keys = require('./keys');

mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
  });

module.exports = { mongoose };
