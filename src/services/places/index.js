import API from "../../helpers/api";
import { getApiResponse } from "../../helpers/getApiResponse";
import { Apis } from "../api";

export const getAllPlaces = async () => {
  try {
    const response = await API.get(`${Apis.Places}`);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.response);
  }
};

export const addPlace = async (payload) => {
  try {
    const response = await API.post(`${Apis.Places}`, payload);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.response);
  }
};
