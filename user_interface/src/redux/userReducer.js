import {LOG_IN,LOG_OUT} from './actionTypes';

export default function userReducer(
  state = {isLoggedIn: false, userProfile: {}, JWTToken:null},
  action
) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        userProfile: action.userProfile,
        JWTToken: action.JWTToken,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        userProfile: null,
        JWTToken: null,
      };

    default:
      return state;
  }
}

