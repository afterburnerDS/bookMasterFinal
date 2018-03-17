import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const FETCH_PROTECTED_DATA_SUCCESS = "FETCH_PROTECTED_DATA_SUCCESS";
export const fetchProtectedDataSuccess = data => ({
  type: FETCH_PROTECTED_DATA_SUCCESS,
  data
});

export const FETCH_PROTECTED_DATA_ERROR = "FETCH_PROTECTED_DATA_ERROR";
export const fetchProtectedDataError = error => ({
  type: FETCH_PROTECTED_DATA_ERROR,
  error
});

export const fetchProtectedData = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/books`, {
    method: "GET",
    headers: {
      // Provide our auth token as credentials
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
      // 'Cache-Control': 'no-cache',
      // 'Pragma': 'no-cache',
      // 'Expires' : 0
    }
  })
    .then(res => {
      return normalizeResponseErrors(res);
    })
    .then(res => res.json())
    .then(data => dispatch(fetchProtectedDataSuccess(data)))
    .catch(err => dispatch(fetchProtectedDataError(err)));
};
