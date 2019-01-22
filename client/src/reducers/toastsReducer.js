const toastsReducerDefaultState = {
  toastType: null,
  toastMessage: null
};

export default (state = toastsReducerDefaultState, action) => {
  switch (action.type) {
    case 'SHOW_TOAST':
      return {
        toastType: action.toastType,
        toastMessage: action.toastMessage
      };

    case 'HIDE_TOAST':
      return {
        toastType: null,
        toastMessage: null
      };

    default:
      return state;
  }
};
