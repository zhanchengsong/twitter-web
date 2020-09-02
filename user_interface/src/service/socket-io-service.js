import serviceURL from "../configuration/service-path";
import {init} from "http-proxy-middleware/dist/handlers";
const io = require('socket.io-client');
let mentionSocketUrl = serviceURL.socketUrl;
// const socket = io.connect(null,{transports: ['websocket']});
let _socket = null;
const initSocket = () => {
    let socket = io("/mentions");
    socket.on("connect", data => {
        console.log("UI Connected with socket " + data);
    })

    socket.on("hello", data => {
        console.log(data);
    })

    socket.on("gordon", data => {
        console.log("-------");
        console.log(data);
    })

    socket.on("sqs_msg", data => {
        console.log(data);
    })
    return socket;
}
export const getSocket = () => {
    if (_socket) return _socket;
    _socket = initSocket();
    return _socket;
}

// Object.freeze(socket);
