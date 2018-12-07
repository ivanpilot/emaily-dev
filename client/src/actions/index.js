import { FETCH_USER } from './types';

// export const fetchUser = () => {
//   return (dispatch) => {
//     return fetch('/api/current_user')
//       .then(res => res.json())
//       .then(res => {
//         console.log('res is: ', res)
//         dispatch(authUser(res))
//       })
//       .catch(err => {
//         console.log('error fetching data')
//       })
//   }
// }

export const fetchUser = () => async dispatch => {
    try {
      const res = await fetch('/api/current_user');
      const response = await res.json();
      dispatch(authUser(response));
    }
    catch(err) {
      console.log('error login: ', err)
      dispatch(errLogin());
    }
}

function authUser(user) {
  return {
    type: FETCH_USER,
    payload: user
  }
}

function errLogin() {
  return {
    type: FETCH_USER,
    payload: false
  }
}