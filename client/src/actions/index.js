import { FETCH_USER } from './types';

export const fetchUser = () => {
  // debugger
  return (dispatch) => {
    debugger
    fetch('/api/current_user')
      .then(res => dispatch(authUser(res)))
      // .then(res => dispatch({
      //   type: FETCH_USER,
      //   payload: res
      // }))
  }
}

function authUser(user) {
  return {
    type: FETCH_USER,
    payload: user
  }
}