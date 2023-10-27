import { LOGIN_SUCCESS, LOGOUT } from "./authAction";
import { SET_SUCCESS_MESSAGE } from './authAction';

const initialState = {
  token: localStorage.getItem('token') || null,
  roleId: localStorage.getItem('roleId') || null,
  userid: localStorage.getItem('userid') || null,
 
  successMessage: '',
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('roleId', action.payload.roleId); 
      localStorage.setItem('roleId', action.payload.roleId);
      return {
        ...state,
        token: action.payload.token,
        roleId: action.payload.roleId,
        userid:action.payload.userid,
      };

    case LOGOUT:
      localStorage.clear(); 
      sessionStorage.removeItem('roleId'); 
      sessionStorage.removeItem('userid');
      sessionStorage.clear();
      return {
        
        ...state,
        token: null,
        roleId: null,
       
      };
      case SET_SUCCESS_MESSAGE:
        return {
          ...state,
          successMessage: action.payload,
        };

    default:
      return state;
  }
};

export default authReducer;