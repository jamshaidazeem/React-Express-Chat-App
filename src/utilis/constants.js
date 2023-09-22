const BASE_URL = "http://localhost:5000";

// users
const URL_USERS = `${BASE_URL}/api/users`;
const URL_USERS_SIGNUP = `${URL_USERS}/signup`;
const URL_VERIFY_EMAIL = `${URL_USERS}/verifyEmail`;
const URL_USERS_LOGIN = `${URL_USERS}/login`;
const URL_USERS_LOGOUT = `${URL_USERS}/logout`;
const URL_USERS_FORGOT_PASS = `${URL_USERS}/forgotPassword`;
const URL_USERS_NEW_PASS = `${URL_USERS}/newPassword`;
const URL_USERS_RESET_PASS = `${URL_USERS}/resetPassword`;
const URL_USERS_DETAIL = `${URL_USERS}/detail`;
const URL_USERS_UPDATE = `${URL_USERS}/update`;
const URL_USERS_LIST = `${URL_USERS}/chatUsers`;

// messages
const URL_MESSAGES = `${BASE_URL}/api/messages`;
const URL_MESSAGES_CREATE = `${URL_MESSAGES}/create`;

export {
  BASE_URL,
  URL_USERS_SIGNUP,
  URL_VERIFY_EMAIL,
  URL_USERS_LOGIN,
  URL_USERS_LOGOUT,
  URL_USERS_FORGOT_PASS,
  URL_USERS_NEW_PASS,
  URL_USERS_RESET_PASS,
  URL_USERS_DETAIL,
  URL_USERS_UPDATE,
  URL_USERS_LIST,
  URL_MESSAGES,
  URL_MESSAGES_CREATE,
};
