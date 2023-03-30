import API from "../../helpers/api";
import { getApiResponse } from "../../helpers/getApiResponse";
import { Apis } from "../api";

export const getAllUsers = async () => {
  try {
    let response = await API.get(`${Apis.Users}`);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.response);
  }
};

export const registerUser = async ({ payload }) => {
  try {
    let response = await API.post(`${Apis.Signup}`, payload);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.response);
  }
};

export const loginUser = async ({ payload }) => {
  try {
    let response = await API.post(`${Apis.Login}`, payload);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.response);
  }
};
