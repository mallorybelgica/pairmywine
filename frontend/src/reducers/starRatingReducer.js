const initialState = {
  rating: 0,
  error: null,
};

export default function starRatingReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_RATING": {
      return {
        ...state,
        rating: action.rating,
      };
    }
    case "RECEIVE_RATING_ERROR": {
      return {
        ...state,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
