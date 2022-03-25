import React from "react";
import styled from "styled-components";

const Container = styled.div`
  align-self: ${(props) => (props.fromMe ? "flex-end" : "flex-start")};
  max-width: 40%;
`;
const MessageContainer = styled.div`
  padding: 12px;
  word-break: break-word;
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
const Div = styled.div`
  text-align: ${(props) => props.textAlign || "start"};
  color: #373e53;
`;

const Message = React.forwardRef(
  ({ children, username, timestamp }, endRef) => {
    return (
      <Container ref={endRef} fromMe={!username}>
        {username && <Div>{username}</Div>}
        <div style={{ display: "inline-block" }}>
          <MessageContainer fromMe={!username}>{children}</MessageContainer>
          <Div textAlign={"end"}>{timestamp}</Div>
        </div>
      </Container>
    );
  }
);

export default Message;
