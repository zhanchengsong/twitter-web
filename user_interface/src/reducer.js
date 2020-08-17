import {LOG_IN} from './actionTypes';
export default function reducer(
  state = {
    isLoggedIn: false,
    userProfile: {
      userName: "UserName",
      userID: "userID",
      userPic: "http://userpic",
    },
    JWTToken: "",
  },
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
        JWTToken: "a",
      };
    default:
      return state;
  }
}

// structure:

// user info:
// - userName: String
// - loggedIn: Boolean
// - userPic: href
// -
