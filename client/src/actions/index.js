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

// in the process of stripe, handleToken is to send the token received from stripe to our server so that our server will then send it back straight to stripe. to send the token receive we will POST it to a specific route. Once the token is sent to our server and we received the response we then dispatch to the store our user. PS: we could have a separated process for the billing and credits than reusing our user model.
export const handleToken = (token) => async dispatch => {
    try {
        const res = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(token),
        })
        const response = await res.json();
        dispatch(authUser(response)); //here the idea is to use the same infrastructure we already used for authLogin so we redispatch the same action that will provide use the credit of the user
    }
    catch(err) {
      console.log('error login: ', err)
      dispatch(errLogin());
    }
}
