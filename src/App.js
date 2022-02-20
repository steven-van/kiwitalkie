import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatroom from "pages/Chatroom";
import Login from "pages/Login";
import io from "socket.io-client";

const socket = io.connect("http://localhost:1337");

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login socket={socket} />}></Route>
          <Route
            path="/chatroom"
            element={<Chatroom socket={socket} />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
