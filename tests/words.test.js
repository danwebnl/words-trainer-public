const expect = require('expect');
const request = require('supertest');
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const app = require('../index').app;
const Word = mongoose.model('words');

const words = [
  {
    _id: new ObjectID(),
    foreignWord: 'ja',
    translation: 'yes',
    dateCreation: '2018-10-06 20:23:43.511Z'
  },
  {
    _id: new ObjectID(),
    foreignWord: 'nee',
    translation: 'no',
    dateCreation: '2018-10-06 20:23:43.512Z'
  }
];

beforeEach(done => {
  Word.deleteMany({})
    .then(() => {
      return Word.insertMany(words);
    })
    .then(() => done());
});

describe('POST api/words', () => {
  it('should create new word', done => {
    const word = { foreignWord: 'klant', translation: 'client' };

    request(app)
      .post('/api/words')
      .send(word)
      .expect(200)
      .expect(res => {
        expect(res.body.foreignWord).toBe(word.foreignWord);
        expect(res.body.translation).toBe(word.translation);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Word.find({ foreignWord: word.foreignWord })
          .then(Word => {
            expect(Word.length).toBe(1);
            expect(Word[0].foreignWord).toBe(word.foreignWord);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create Word with invalid body data', done => {
    request(app)
      .post('/api/words')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Word.find()
          .then(Word => {
            expect(Word.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET api/words', () => {
  it('should get all words', done => {
    request(app)
      .get('/api/words')
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET api/words/:id', () => {
  it('should return word doc', done => {
    request(app)
      .get(`/api/words/${words[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.foreignWord).toBe(words[0].foreignWord);
        expect(res.body.translation).toBe(words[0].translation);
      })
      .end(done);
  });

  it('should return 404 if word not found', done => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/api/words/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non object ids', done => {
    request(app)
      .get(`/api/words/abc123`)
      .expect(404)
      .end(done);
  });
});

describe('Delete api/words/:id', () => {
  it('should remove a word', done => {
    const hexId = words[1]._id.toHexString();

    request(app)
      .delete(`/api/words/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(hexId);
        expect(res.body.foreignWord).toBe(words[1].foreignWord);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Word.findById(hexId)
          .then(word => {
            expect(word).toBeNull();
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should return 404 if the word is not found', done => {
    const hexId = new ObjectID().toHexString();
    request(app)
      .get(`/api/words/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if the object id is invalid', done => {
    request(app)
      .delete(`/api/words/abc123`)
      .expect(404)
      .end(done);
  });
});

describe('PUT /api/words/:id', () => {
  it('should update the word', done => {
    const hexId = words[0]._id.toHexString();
    const updatedWord = {
      foreignWord: 'Updated new word',
      translation: 'Updated new translation'
    };

    request(app)
      .put(`/api/words/${hexId}`)
      .send(updatedWord)
      .expect(200)
      .expect(res => {
        console.log('res.body');
        console.log(res.body);
        expect(res.body._id).toBe(hexId);
        expect(res.body.foreignWord).toBe(updatedWord.foreignWord);
        expect(res.body.translation).toBe(updatedWord.translation);
      })
      .end(done);
  });
});
