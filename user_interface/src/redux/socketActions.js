import {SOCKET_CREATE} from './actionTypes'
export const socketCreateAction = (socket) => {
    return {
        type: SOCKET_CREATE,
        socket: socket
    }
};