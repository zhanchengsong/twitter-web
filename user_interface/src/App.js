import React from "react";
import "./App.css";
import CCanvas from "./containers/CCanvas";
import {initSockets} from "./service/socket-io-service";
import SocketContext from "./context/socket-context";
const io = require('socket.io-client');
const initSocket = () => {
  let socket = io("/mentions");
  socket.on("connect", data => {
    console.log("UI Connected with socket " + data);
  })

  return socket;
}

const sockets = initSockets();
function App(props) {
  return <SocketContext.Provider value={sockets}>
          <CCanvas />
        </SocketContext.Provider>
}

export default App;
