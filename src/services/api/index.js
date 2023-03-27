import { BASE_API_PATH } from "../../helpers/api";

//Users
const BASE_API_PATH_USERS = `${BASE_API_PATH}users`;
const BASE_API_PATH_SIGN_UP = `${BASE_API_PATH_USERS}/signup`;
const BASE_API_PATH_LOGIN = `${BASE_API_PATH_USERS}/login`;

//Places
const BASE_API_PATH_PLACES = `${BASE_API_PATH}places`;
const BASE_API_PATH_USER_PLACES = `${BASE_API_PATH_PLACES}/user`;

export const Apis = {
  //Users
  Users: BASE_API_PATH_USERS,
  Signup: BASE_API_PATH_SIGN_UP,
  Login: BASE_API_PATH_LOGIN,

  //Places
  Places: BASE_API_PATH_PLACES,
  UserPlaces: BASE_API_PATH_USER_PLACES,
};
