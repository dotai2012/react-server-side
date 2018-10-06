import { AUTH_USER } from '../actions/type';

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    default:
      return state;
  }
}
