const initialState = {
  status: "loading",
  wineDetails: null,
  error: null,
};

export default function wineDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_WINE_DETAILS": {
      return {
        ...state,
        status: "idle",
        wineDetails: action.wineDetails,
      };
    }
    case "RECEIVE_ERROR_WINE_DETAILS": {
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
