import { ActionType } from "./redux.type";

const initialState = {
  userType: null,
  userId: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.userType:
      return { ...state, userType: action.payload };
    case ActionType.userId:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};
