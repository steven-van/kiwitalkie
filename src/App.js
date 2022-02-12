import React, { useState, useEffect } from "react";
import Header from "components/Header";
import styled from "styled-components";
import InputChat from "components/InputChat";
import { ToastContainer, toast } from "react-toastify";
import MessageList from "components/MessageList";
import InputRoom from "components/InputRoom";
import "react-toastify/dist/ReactToastify.css";

import io from "socket.io-client";

const Page = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  max-width: 1920px;
  height: 100vh;
  background-color: #4b4f59;
`;

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Sidebar = styled.div`
  padding: 10px;
  width: 20%;
  display: flex;
  justify-content: center;
  background-color: #1d2437;
  @media (max-width: 768px) {
    width: 30%;
  }
`;

const socket = io.connect("http://localhost:1337");

const App = () => {
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState("");

  const handleJoinRoom = (newRoom) => {
    if (newRoom !== room) {
      socket.emit("join-room", newRoom, room);
      toast.info(`Joined room #${newRoom}`, {
        theme: "colored",
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setRoom(newRoom);
    }
  };

  const handleMessageSubmit = (msg) => {
    if (msg.text.trim() !== "") {
      socket.emit("send-message", msg, room);
      setMessageList([
        ...messageList,
        {
          text: msg.text,
          timestamp: msg.timestamp,
          fromMe: true,
        },
      ]);
    }
  };

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setMessageList([
        ...messageList,
        {
          text: msg.text,
          timestamp: msg.timestamp,
          fromMe: false,
        },
      ]);
    });
  });

  return (
    <Page>
      <Sidebar>
        <InputRoom handleJoinRoom={handleJoinRoom} />
      </Sidebar>
      <ChatSection>
        <Header />
        <MessageList room={room} messages={messageList} />
        <InputChat handleMessageSubmit={handleMessageSubmit} />
      </ChatSection>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Page>
  );
};

export default App;
