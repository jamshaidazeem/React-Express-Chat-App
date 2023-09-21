import { EVENT_SAVE_USER, EVENT_REMOVE_USER } from "./reduxConstants";

export const saveUserInStore = (user) => ({
  type: EVENT_SAVE_USER,
  payload: user,
});

export const removeUserFromStore = () => ({
  type: EVENT_REMOVE_USER,
  payload: null,
});
