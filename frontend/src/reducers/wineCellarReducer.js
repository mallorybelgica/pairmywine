const initialState = {
  status: "loading",
  cellarDetails: null,
  error: null,
};

export default function wineCellarReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_CELLAR_DETAILS": {
      return {
        ...state,
        status: "idle",
        cellarDetails: action.cellarDetails,
      };
    }
    case "RECEIVE_ERROR_CELLAR_DETAILS": {
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
