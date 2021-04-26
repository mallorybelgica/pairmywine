const initialState = {
  status: "loading",
  currentFoods: null,
  error: null,
};

export default function foodsListReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_FOODS": {
      return {
        ...state,
        status: "idle",
        currentFoods: action.currentFoods,
      };
    }
    case "RECEIVE_ERROR_FOODS": {
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
