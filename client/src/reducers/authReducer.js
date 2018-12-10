import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false //if user is not loggedin the payload is '' string which is falsy so we want to return explicitly false in that case
    default:
      return state;
  }
}
