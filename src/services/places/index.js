import API from "../../helpers/api";
import { getApiResponse } from "../../helpers/getApiResponse";
import { Apis } from "../api";

export const getAllPlaces = async ({ config }) => {
  try {
    const response = await API.get(`${Apis.Places}`, config);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.response);
  }
};

export const addPlace = async ({ payload, config }) => {
  try {
    const response = await API.post(`${Apis.Places}`, payload, config);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.response);
  }
};

export const getUserPlaces = async ({ params, config }) => {
  const { userId } = params;
  try {
    const response = await API.get(`${Apis.UserPlaces}/${userId}`, config);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.message);
  }
};

export const getPlaceById = async ({ params, config }) => {
  const { pid } = params;
  try {
    const response = await API.get(`${Apis.Places}/${pid}`, config);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.message);
  }
};

export const updatePlaceById = async ({ params, payload, config }) => {
  const { pid } = params;
  try {
    const response = await API.patch(`${Apis.Places}/${pid}`, payload, config);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.message);
  }
};

export const deletePlacyById = async ({ params: pid, config }) => {
  try {
    const response = await API.delete(`${Apis.Places}/${pid}`, config);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.message);
  }
};
