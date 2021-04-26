const initialState = {
  status: "loading",
  currentGrapes: null,
  error: null,
};

export default function grapesListReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_GRAPES": {
      return {
        ...state,
        status: "idle",
        currentGrapes: action.currentGrapes,
      };
    }
    case "RECEIVE_ERROR_GRAPES": {
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
