const initialState = {
  status: "loading",
  currentGroups: null,
  error: null,
};

export default function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_GROUPS": {
      return {
        ...state,
        status: "idle",
        currentGroups: action.currentGroups,
      };
    }
    case "RECEIVE_ERROR_GROUPS": {
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
