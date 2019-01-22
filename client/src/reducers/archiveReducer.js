const archiveReducerDefaultState = {
  wordsArchive: []
};

export default (state = archiveReducerDefaultState, action) => {
  switch (action.type) {
    case 'GET_ARCHIVE':
      return {
        wordsArchive: action.words
      };

    case 'ACTIVATE_WORD': {
      return {
        wordsArchive: state.wordsArchive.filter((wordItem) => {
          if (wordItem._id === action.word._id) {
            return false;
          }
          return true;
        })
      };
    }

    default:
      return state;
  }
};
