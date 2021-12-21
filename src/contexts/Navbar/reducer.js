import * as action_types from "./actiontypes";

const reducer = (state, action) => {
  switch (action.type) {
    case action_types.SET_ACTIVE:
      return {
        ...state,
        activeButton: action.navLinkActive,
      };
    default:
      return state;
  }
};

export default reducer;