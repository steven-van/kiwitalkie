import React from "react";
import styled from "styled-components";
import Message from "components/Message";

const MessageListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222a3f;
  padding: 30px;
  flex: 1;
  overflow-y: auto;
`;

const MessageList = ({ messages }) => {
  const renderChat = () => {
    const renderedMessages = messages.map((message, index) => {
      return (
        <Message
          key={index}
          fromMe={message.fromMe}
          timestamp={message.timestamp}
        >
          {message.text}
        </Message>
      );
    });
    return renderedMessages;
  };

  return <MessageListContainer>{renderChat()}</MessageListContainer>;
};

export default MessageList;
