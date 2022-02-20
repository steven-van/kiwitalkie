import React, { useState, useEffect, useContext } from "react";
import Header from "components/Header";
import styled from "styled-components";
import InputChat from "components/InputChat";
import { ToastContainer, toast } from "react-toastify";
import MessageList from "components/MessageList";
import InputRoom from "components/InputRoom";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "contexts/UserContext";

const Page = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  max-width: 1920px;
  height: 100vh;
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
  flex-direction: column;
  justify-content: space-between;
  background-color: #1d2437;
  @media (max-width: 768px) {
    width: 30%;
  }
`;

const Text = styled.p`
  color: white;
  text-align: center;
  font-weight: 500;
`;

const Chatroom = ({ socket }) => {
  const [messageList, setMessageList] = useState([]);
  const { username } = useContext(UserContext);
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
      const date = new Date();
      const time =
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0");
      setMessageList([
        ...messageList,
        {
          text: msg.text,
          timestamp: time,
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
          username: msg.username,
        },
      ]);
    });
  });

  return (
    <Page>
      <Sidebar>
        <InputRoom handleJoinRoom={handleJoinRoom} />
        <Text>Hello {username}</Text>
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

export default Chatroom;
