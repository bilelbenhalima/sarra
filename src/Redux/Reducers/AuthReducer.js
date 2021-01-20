const initialState = {
  token: null,
  userId: null,
  full_name:null
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        token: action.value.token,
        userId: action.value.userId,
        full_name:action.value.full_name
      };
    case "LOGOUT":
      return {
        token: null,
        userId: null,
        full_name:null
      };
    default:
      return state;
  }
}

export default AuthReducer;
