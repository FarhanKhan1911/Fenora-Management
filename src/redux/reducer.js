import { ActionType } from "./redux.type";

const initialState = {
  userType: null
};

export const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.userType:
      return { ...state, userType: action.payload };
    default:
      return state;
  }
};
