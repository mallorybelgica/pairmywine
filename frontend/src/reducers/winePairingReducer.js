const initialState = {
  status: "loading",
  recommendedWines: null,
  error: null,
};

export default function winePairingReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_WINE_PAIRING_RECOMMENDATION": {
      return {
        ...state,
        status: "idle",
        recommendedWines: action.recommendedWines,
      };
    }
    case "RECEIVE_WINE_PAIRING_ERROR": {
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
