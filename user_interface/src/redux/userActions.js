import {LOG_IN, LOG_OUT} from './actionTypes'
export const loginAction = (userProfile, jwtToken) => {
    return {
        type: LOG_IN, 
        userProfile: userProfile,
        JWTToken: jwtToken
    }
};
export const logoutAction = () => {
    return {
        type: LOG_OUT
    }
}