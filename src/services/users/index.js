import API from "../../helpers/api";
import { getApiResponse } from "../../helpers/getApiResponse";
import { Apis } from "../api";

export const getAllUsers = async ({ config }) => {
  try {
    let response = await API.get(`${Apis.Users}`, config);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.response);
  }
};

export const registerUser = async ({ payload, config }) => {
  try {
    let response = await API.post(`${Apis.Signup}`, payload, config);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.response);
  }
};

export const loginUser = async ({ payload, config }) => {
  try {
    let response = await API.post(`${Apis.Login}`, payload, config);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.response);
  }
};
