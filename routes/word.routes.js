const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const moment = require('moment');
const passport = require('passport');

const Word = mongoose.model('words');

module.exports = app => {
  
  app.get('/api/words', (req, res) => {

    Word.find({ mastered: false, _user: req.user._id })
      .sort({ dateCreation: -1 })
      .select({ _v: false })
      .then(words => {
        res.send(words);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });

  app.get('/api/words/:wordId', (req, res) => {
    const wordId = req.params.wordId;

    if (!ObjectID.isValid(wordId)) {
      return res.status(404).send('ID not valid');
    }

    Word.findOne({ _id: wordId, _user: req.user.id })
      .then(word => {
        if (!word) {
          res.status(404).send();
        }
        res.send(word);
      })
      .catch(e => {
        res.status(400).send();
      });
  });

  app.post('/api/words', (req, res) => {
    const { foreignWord, translation } = req.body;
    const word = new Word({
      foreignWord,
      translation,
      dateCreation: moment.now(),
      score: 0,
      mastered: false,
      _user: req.user.id
    });

    word
      .save()
      .then(document => {
        res.send(document);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });

  app.put('/api/words/:wordId', (req, res) => {
    const wordId = req.params.wordId;

    if (!ObjectID.isValid(wordId)) {
      return res.status(404).send();
    }

    Word.findOneAndUpdate({ _id: wordId }, { ...req.body }, { new: true })
      .then(document => {
        res.send(document);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });

  app.delete('/api/words/:wordId', async (req, res) => {
    const wordId = req.params.wordId;

    if (!ObjectID.isValid(wordId)) {
      return res.status(404).send();
    }

    try {
      const word = await Word.findOneAndRemove({
        _id: wordId,
        _user: req.user.id
      });
      if (!word) {
        return res.status(400).send();
      }
      res.send(word);
    } catch (e) {
      res.status(400).send(e);
    }

    Word.remove;
  });

  app.patch('/api/words/:wordId', async (req, res) => {
    const wordId = req.params.wordId;
    if (!ObjectID.isValid(wordId)) {
      return res.status(404).send();
    }

    const answer = req.body.answer;
    if (['yes', 'no'].indexOf(answer) === -1) {
      return res.status(404).send();
    }

    const word = await Word.findOne({ _id: wordId });
    if (!word) {
      res.status(404).send();
    }

    let score = word.score;
    let mastered = word.mastered;

    if (answer === 'yes') {
      score++;
      if (score === ANSWERS_THRESHOLD) {
        mastered = true;
      }
    } else {
      if (score > 0) {
        score--;
      }
    }

    Word.findOneAndUpdate(
      { _id: wordId },
      { $set: { score: score, mastered: mastered } },
      { new: true }
    )
      .then(document => {
        res.send(document);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });

  app.get('/api/archive', (req, res) => {
    Word.find({ mastered: true, _user: req.user.id })
      .sort({ dateCreation: -1 })
      .select({ _v: false })
      .then(words => {
        res.send(words);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });

  app.patch('/api/words/activate/:wordId', async (req, res) => {
    const wordId = req.params.wordId;
    if (!ObjectID.isValid(wordId)) {
      return res.status(404).send();
    }

    Word.findOneAndUpdate(
      { _id: wordId },
      { $set: { score: 0, mastered: false } },
      { new: true }
    )
      .then(document => {
        res.send(document);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });
};
