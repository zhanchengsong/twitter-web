import serviceURL from "../configuration/service-path";
const io = require('socket.io-client');
let mentionSocketUrl = serviceURL.socketUrl;

export const initSockets = () => {
    let nsocket = io("/notifications");
    nsocket.on("connect", data => {
        console.log("UI Connected with socket notifications");
    })
    let csocket = io("/notificationsCount");
    csocket.on("connect", data => {
        console.log("UI Connected with socket notificationsCount");
    })

    return {
        csocket,
        nsocket
    };
}
