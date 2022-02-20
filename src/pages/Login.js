import React, { useState } from "react";
import styled from "styled-components";
import KiwiTalkieLogo from "components/KiwiTalkieLogo";
import door from "assets/door.svg";
import { useNavigate } from "react-router-dom";

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1920px;
  height: 100vh;
  padding: 20px;
  background-color: #222a3f;
`;

const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #1d2437;
`;

const Input = styled.input`
  width: 60%;
  padding: 20px;
  outline: none;
  border: 0;
  color: white;
  margin-top: 10px;
  background-color: #222a3f;
  border-radius: 10px;
  ::placeholder {
    color: #373e53;
  }
`;
const Text = styled.p`
  color: white;
  text-align: center;
  font-weight: 500;
`;

const LogoContainer = styled.div`
  height: 60px;
`;

const SubmitButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  margin-top: 15px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #32de84;

  &:hover {
    cursor: pointer;
  }
`;

const Login = ({ socket }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (user) => {
    if (user.trim() !== "") {
      socket.emit("add-user", user);
      navigate("/chatroom");
    }
  };

  return (
    <Page>
      <LoginModal>
        <LogoContainer>
          <KiwiTalkieLogo />
        </LogoContainer>
        <Text>Welcome to KiwiTalkie your instant messaging app</Text>
        <Input
          placeholder="Enter your username..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit(username);
            }
          }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <SubmitButton onClick={() => handleSubmit(username)}>
          <img src={door} style={{ width: "80%" }} alt="Door Icon" />
        </SubmitButton>
      </LoginModal>
    </Page>
  );
};

export default Login;
