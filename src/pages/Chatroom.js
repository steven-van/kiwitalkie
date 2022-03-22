import React, { useState, useEffect, useContext } from "react";
import Header from "components/Header";
import styled from "styled-components";
import door from "assets/door.svg";
import InputChat from "components/InputChat";
import { ToastContainer, toast } from "react-toastify";
import MessageList from "components/MessageList";
import InputRoom from "components/InputRoom";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "contexts/UserContext";
import { delete_cookie } from "sfcookies";

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
  align-items: center;
  background-color: #1d2437;
  @media (max-width: 768px) {
    width: 30%;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  padding: 10px;
  color: white;
  align-items: center;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #32de84;

  &:hover {
    cursor: pointer;
  }
`;

const UsernameContainer = styled.p`
  color: #373e53;
  text-align: center;
  font-weight: 500;
`;

const Chatroom = ({ socket }) => {
  const [messageList, setMessageList] = useState([]);
  const { username, setUsername } = useContext(UserContext);
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
      setMessageList([]);
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

  const handleLogout = () => {
    socket.emit("remove-user");
    delete_cookie("user");
    setUsername("");
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
        <div>
          <UsernameContainer>
            Hello <span style={{ fontWeight: "bold" }}>{username}</span>
          </UsernameContainer>
          <LogoutButton onClick={() => handleLogout()}>
            <img src={door} style={{ width: "25px" }} alt="Door Icon" />
            Logout
          </LogoutButton>
        </div>
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
