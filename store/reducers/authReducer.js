const initialState = {
  isLoggedIn: false,
};
const authReducer = (state = initialState, action) => {
  if (action.type === 'SET_AUTH') {
    return {
      ...state,
      isLoggedIn: action.authState,
    };
  } else {
    return state;
  }
};

export default authReducer;
