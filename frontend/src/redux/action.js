import { ActionType } from "./redux.type";

export const setUserType = (userTypeName) => {
  return {
    type: ActionType.userType,
    payload: userTypeName
  };
};

