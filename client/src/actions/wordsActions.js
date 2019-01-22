import axios from 'axios';
import toastsUtil from '../utils/toasts';

export const getWords = () => (dispatch) => {
  console.log(`Words API called${new Date()}`);
  axios
    .get('/api/words')
    .then(res => dispatch({
      type: 'GET_WORDS',
      words: res.data
    }))
    .catch((e) => {
      throw e;
    });
};

export const removeWord = (wordId = null) => (dispatch) => {
  axios
    .delete(`/api/words/${wordId}`)
    .then((res) => {
      dispatch({
        type: 'DELETE_WORD',
        word: res.data
      });

      dispatch({
        type: 'SHOW_TOAST',
        toastType: toastsUtil.types.success,
        toastMessage: toastsUtil.messages.wordWasDeleted
      });
    })
    .catch((e) => {
      throw e;
    });
};

export const addWord = ({ foreignWord, translation }) => (dispatch) => {
  axios
    .post('/api/words/', {
      foreignWord,
      translation
    })
    .then((res) => {
      dispatch({
        type: 'ADD_WORD',
        word: res.data
      });

      dispatch({
        type: 'SHOW_TOAST',
        toastType: toastsUtil.types.success,
        toastMessage: toastsUtil.messages.wordWasAdded
      });
    })
    .catch((e) => {
      throw e;
    });
};

export const getWord = ({ wordId }) => (dispatch) => {
  axios
    .get(`/api/words/${wordId}`)
    .then((res) => {
      dispatch({
        type: 'GET_WORD',
        word: res.data
      });
    })
    .catch((e) => {
      throw e;
    });
};

export const editWord = ({ wordId, foreignWord, translation }) => (dispatch) => {
  axios
    .put(`/api/words/${wordId}`, {
      foreignWord,
      translation
    })
    .then((res) => {
      dispatch({
        type: 'EDIT_WORD',
        word: res.data
      });

      dispatch({
        type: 'SHOW_TOAST',
        toastType: toastsUtil.types.success,
        toastMessage: toastsUtil.messages.wordWasEdited
      });
    })
    .catch((e) => {
      throw e;
    });
};

export const feedbackWord = (wordId, answer) => (dispatch) => {
  axios
    .patch(`/api/words/${wordId}`, {
      answer
    })
    .then((res) => {
      dispatch({
        type: 'FEEDBACK_WORD',
        word: res.data
      });
    })
    .catch((e) => {
      throw e;
    });
};

export const hideToast = () => (dispatch) => {
  dispatch({
    type: 'HIDE_TOAST'
  });
};

export const getArchive = () => (dispatch) => {
  console.log(`Archive API called ${new Date()}`);
  axios
    .get('/api/archive')
    .then(res => dispatch({
      type: 'GET_ARCHIVE',
      words: res.data
    }))
    .catch((e) => {
      throw e;
    });
};

export const activateWord = wordId => (dispatch) => {
  axios
    .patch(`/api/words/activate/${wordId}`)
    .then((res) => {
      dispatch({
        type: 'ACTIVATE_WORD',
        word: res.data
      });

      dispatch({
        type: 'SHOW_TOAST',
        toastType: toastsUtil.types.success,
        toastMessage: toastsUtil.messages.wordWasActivated
      });
    })
    .catch((e) => {
      throw e;
    });
};
