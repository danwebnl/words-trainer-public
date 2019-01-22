const env = process.env.NODE_ENV || 'development';
console.log('Environment: ', env);

if (env === 'development') {
  process.env.PORT = 5000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/WordsTrainer';
} else if (env === 'test') {
  process.env.PORT = 5000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/WordsTrainerTest';
}

ANSWERS_THRESHOLD = 4;
