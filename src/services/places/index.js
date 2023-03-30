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

export const addPlace = async ({ payload }) => {
  try {
    const response = await API.post(`${Apis.Places}`, payload);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.response);
  }
};

export const getUserPlaces = async ({ params }) => {
  const { userId } = params;
  try {
    const response = await API.get(`${Apis.UserPlaces}/${userId}`);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.message);
  }
};

export const getPlaceById = async ({ params }) => {
  const { pid } = params;
  try {
    const response = await API.get(`${Apis.Places}/${pid}`);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.message);
  }
};

export const updatePlaceById = async ({ params, payload }) => {
  const { pid } = params;
  try {
    const response = await API.patch(`${Apis.Places}/${pid}`, payload);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.message);
  }
};

export const deletePlacyById = async ({ params: pid }) => {
  try {
    const response = await API.delete(`${Apis.Places}/${pid}`);
    return getApiResponse(response);
  } catch (err) {
    return getApiResponse(err?.message);
  }
};
