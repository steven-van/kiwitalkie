import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  padding: 12px;
  max-width: 30%;
  overflow-wrap: break-word;
  font-weight: 500;
  color: white;
  background-color: ${(props) => (props.fromMe ? "#32de84" : "#1d2437")};
  margin-top: 8px;
  border-radius: 10px;
  align-self: ${(props) => (props.fromMe ? "flex-end" : "flex-start")};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Message = ({ children, fromMe }) => {
  return <MessageContainer fromMe={fromMe}>{children}</MessageContainer>;
};

export default Message;
