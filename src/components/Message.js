import React from "react";
import styled from "styled-components";

const Container = styled.div`
  align-self: ${(props) => (props.fromMe ? "flex-end" : "flex-start")};
  max-width: 40%;
  display: flex;
  flex-direction: column;
  }
`;
const MessageContainer = styled.div`
  padding: 12px;
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
const Span = styled.span`
  color: #373e53;
  align-self: ${(props) => props.align || "flex-start"};
`;

const Message = ({ children, username, timestamp }) => {
  return (
    <Container fromMe={!username}>
      {username && <Span>{username}</Span>}
      <MessageContainer fromMe={!username}>{children}</MessageContainer>
      <Span align={"flex-end"}>{timestamp}</Span>
    </Container>
  );
};

export default Message;
