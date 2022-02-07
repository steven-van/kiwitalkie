import React, { useState, useEffect } from "react";
import Header from "components/Header";
import styled from "styled-components";
import InputChat from "components/InputChat";
import MessageList from "components/MessageList";
import io from "socket.io-client";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 1920px;
  height: 100vh;
  background-color: #4b4f59;
`;

const socket = io.connect("http://localhost:1337");

const App = () => {
  const [message, setMessage] = useState({ text: "", fromMe: null });
  const [messageList, setMessageList] = useState([]);

  const handleInputChange = (msg) => {
    setMessage({ text: msg, fromMe: true });
  };

  const handleMessageSubmit = () => {
    if (message.text.trim() !== "") {
      socket.emit("message", message);
      setMessage({ text: "", fromMe: null });
    }
  };

  useEffect(() => {
    socket.on("message", (msg, socketId) => {
      setMessageList([
        ...messageList,
        { text: msg.text, fromMe: socket.id === socketId },
      ]);
    });
  });

  return (
    <Page>
      <Header />
      <MessageList messages={messageList} />
      <InputChat
        message={message}
        handleInputChange={handleInputChange}
        handleMessageSubmit={handleMessageSubmit}
      />
    </Page>
  );
};

export default App;
