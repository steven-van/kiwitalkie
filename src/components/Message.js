import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  padding: 12px;
  max-width: 40%;
  overflow-wrap: break-word;
  font-weight: 500;
  color: white;
  background-color: ${(props) => (props.fromMe ? "#32de84" : "#1d2437")};
  margin-top: 10px;
  border-radius: 10px;
  align-self: ${(props) => (props.fromMe ? "flex-end" : "flex-start")};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (max-width: 768px) {
    max-width: 60%;
  }
`;

const Message = ({ children, fromMe, timestamp }) => {
  return (
    <>
      <MessageContainer fromMe={fromMe}>{children}</MessageContainer>
      <span
        style={{
          color: "#373e53",
          marginTop: "2px",
          alignSelf: fromMe ? "flex-end" : "flex-start",
        }}
      >
        {timestamp}
      </span>
    </>
  );
};

export default Message;
