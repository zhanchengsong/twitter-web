import {LOG_IN} from './actionTypes'
export const loginAction = (userProfile, jwtToken) => {
    return {
        type: LOG_IN, 
        userProfile: userProfile,
        JWTToken: jwtToken
    }
};