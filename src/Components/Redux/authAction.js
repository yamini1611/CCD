export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';


export const setSuccessMessage = (message) => ({
  type: SET_SUCCESS_MESSAGE,
  payload: message,
});


export const loginSuccess = (token, roleId ,userid) => ({ 
  type: LOGIN_SUCCESS,
  payload: { token, roleId ,userid},
});

export const logout = () => ({
 
  type: LOGOUT,
 
});