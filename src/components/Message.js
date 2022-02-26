import React from "react";
import styled from "styled-components";

const Container = styled.div`
  align-self: ${(props) => (props.fromMe ? "flex-end" : "flex-start")};
  max-width: 40%;
`;

const MessageContainer = styled.div`
  padding: 12px;
  display: inline-block;
  overflow-wrap: break-word;
  font-weight: 500;
  color: white;
  background-color: ${(props) => (props.fromMe ? "#32de84" : "#1d2437")};
  margin-top: 2px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (max-width: 768px) {
    max-width: 60%;
  }
`;
const MessageInfo = styled.div`
  color: #373e53;
  text-align: ${(props) => props.align || "start"};
`;

const Message = ({ children, username, timestamp }) => {
  return (
    <Container fromMe={!username}>
      {username && <MessageInfo>{username}</MessageInfo>}
      <MessageContainer fromMe={!username}>{children}</MessageContainer>
      <MessageInfo align={"end"}>{timestamp}</MessageInfo>
    </Container>
  );
};

export default Message;
