import axios from "axios";

export const BASE_API_PATH = "/api/";

// setting base URL for backend requests

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT ?? "http://localhost:5000",
  // headers: {
  //   common: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // },
});

//setting auth (if jwt present)
const token = localStorage.getItem("token");

if (token) {
  instance.defaults.headers["x-access-token"] = token;
}

export default instance;
