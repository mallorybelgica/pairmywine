const initialState = {
  status: "loading",
  grapeDetails: null,
  error: null,
};

export default function grapeDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_GRAPE_DETAILS": {
      return {
        ...state,
        status: "idle",
        grapeDetails: action.grapeDetails,
      };
    }
    case "RECEIVE_ERROR_GRAPE_DETAILS": {
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
