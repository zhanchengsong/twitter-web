import {SOCKET_CREATE} from "./actionTypes";

export default function socketReducer(
    state = {},
    action
) {
    switch (action.type) {
        case SOCKET_CREATE:
            return {
                ...state,
                socket: action.socket
            }
        default:
            return state;
    }
}