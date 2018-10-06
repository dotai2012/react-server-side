import { LIST_USER } from '../actions/type';

export default function (state = [], action) {
  switch (action.type) {
    case LIST_USER:
      return action.payload;
    default:
      return state;
  }
}
