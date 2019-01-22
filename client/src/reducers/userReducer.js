const userReducerDefaultState = {
  user: null
};

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return {
        user: action.payload || false
      };

    default:
      return state;
  }
};
