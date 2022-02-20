import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatroom from "pages/Chatroom";
import Login from "pages/Login";
import io from "socket.io-client";
import UserContext from "contexts/UserContext";

const socket = io.connect("http://localhost:1337");

const App = () => {
  const [username, setUsername] = useState(null);
  return (
    <>
      <Router>
        <UserContext.Provider value={{ username, setUsername }}>
          <Routes>
            <Route exact path="/" element={<Login socket={socket} />} />
            <Route path="/chatroom" element={<Chatroom socket={socket} />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </>
  );
};

export default App;
