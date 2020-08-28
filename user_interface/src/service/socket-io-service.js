import serviceURL from "../configuration/service-path";
const io = require('socket.io-client');

let socketUrl = serviceURL.socketUrl;
// const socket = io.connect(null,{transports: ['websocket']});
let socket = io({});
socket.on("connect", data => {
    console.log("UI Connected with socket " + data);
})

socket.on("hello", data => {
    console.log(data);
})
// Object.freeze(socket);
export default socket;