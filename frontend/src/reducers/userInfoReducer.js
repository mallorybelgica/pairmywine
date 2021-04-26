const initialState = {
  status: "loading",
  loggedIn: false,
  userDetails: null,
  error: null,
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_USER_INFO": {
      return {
        ...state,
        status: "idle",
        loggedIn: true,
        userDetails: action.userDetails,
      };
    }
    case "USER_LOGOUT": {
      return {
        ...state,
        status: "idle",
        loggedIn: false,
        userDetails: null,
      };
    }
    case "USER_EDIT": {
      return {
        ...state,
        status: "idle",
        loggedIn: true,
        userDetails: action.userDetails,
      };
    }
    case "USER_LOGIN_ERROR": {
      return {
        ...state,
        loggedIn: false,
        status: "error",
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
