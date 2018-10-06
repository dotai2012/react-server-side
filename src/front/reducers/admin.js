import { LIST_ADMIN } from '../actions/type';

export default function (state = [], action) {
  switch (action.type) {
    case LIST_ADMIN:
      return action.payload;
    default:
      return state;
  }
}
