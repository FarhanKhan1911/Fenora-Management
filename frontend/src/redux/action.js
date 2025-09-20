import { ActionType } from "./redux.type";

export const setUserType = (userTypeName) => {
  return {
    type: ActionType.userType,
    payload: userTypeName,
  };
};

export const setUserId = (userId) => {
  return {
    type: ActionType.userId,
    payload: userId,
  };
};
