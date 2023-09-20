const BASE_URL = "http://localhost:5000";
const URL_USERS = `${BASE_URL}/api/users`;
const URL_VERIFY_EMAIL = `${URL_USERS}/verifyEmail`;
const URL_USERS_LOGIN = `${URL_USERS}/login`;
const URL_USERS_LOGOUT = `${URL_USERS}/logout`;
const URL_USERS_FORGOT_PASS = `${URL_USERS}/forgotPassword`;

export {
  BASE_URL,
  URL_USERS,
  URL_VERIFY_EMAIL,
  URL_USERS_LOGIN,
  URL_USERS_LOGOUT,
  URL_USERS_FORGOT_PASS,
};
