import {LOG_IN} from './actionTypes';

export default function userReducer(
  state = {},
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
    case "LogOut":
      return {
        ...state,
        isLoggedIn: false,
        userProfile: {
          ...state.userProfile,
          userName: "UserName",
          userID: "userID",
          userPic: "http://userpic",
        },
        JWTToken: null,
      };

    default:
      return state;
  }
}

