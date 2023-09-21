import {
  EVENT_SAVE_USER,
  EVENT_REMOVE_USER,
  KEY_LOGGED_IN_USER,
} from "./reduxConstants";

const INITIAL_STATE = {
  KEY_LOGGED_IN_USER: null,
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EVENT_SAVE_USER:
      return { ...state, KEY_LOGGED_IN_USER: action.payload };
    case EVENT_REMOVE_USER:
      return { ...state, KEY_LOGGED_IN_USER: null };
    default:
      return state;
  }
}
