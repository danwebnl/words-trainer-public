const wordsReducerDefaultState = {
  words: []
};

export default (state = wordsReducerDefaultState, action) => {
  switch (action.type) {
    case 'GET_WORDS':
      return {
        words: action.words
      };

    case 'DELETE_WORD': {
      const words = [...state.words];
      const wordsFiltered = words.filter(word => word._id !== action.word._id);
      return { words: wordsFiltered };
    }

    case 'ADD_WORD':
      return {
        words: [
          {
            _id: action.word._id,
            foreignWord: action.word.foreignWord,
            translation: action.word.translation
          },
          ...state.words
        ]
      };

    case 'EDIT_WORD': {
      return {
        words: state.words.map((wordItem) => {
          let word = wordItem;

          if (word._id === action.word._id) {
            word = {
              _id: action.word._id,
              foreignWord: action.word.foreignWord,
              translation: action.word.translation
            };
          }
          return word;
        })
      };
    }

    case 'FEEDBACK_WORD': {
      return {
        words: state.words.map((wordItem) => {
          let word = wordItem;

          if (word._id === action.word._id) {
            word = {
              _id: action.word._id,
              foreignWord: action.word.foreignWord,
              translation: action.word.translation,
              score: action.word.score,
              mastered: action.word.mastered
            };
          }
          return word;
        })
      };
    }

    default:
      return state;
  }
};
