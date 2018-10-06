import { AUTH_USER, LIST_USER, LIST_ADMIN } from './type';

export const fetchUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/users');
  return dispatch({
    type: LIST_USER,
    payload: res.data,
  });
};
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');
  return dispatch({
    type: AUTH_USER,
    payload: res.data === '' ? false : res.data,
  });
};
export const fetchAdmin = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');
  return dispatch({
    type: LIST_ADMIN,
    payload: res.data,
  });
};
