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
        <Message key={index} fromMe={message.fromMe}>
          {message.text}
        </Message>
      );
    });
    return renderedMessages;
  };

  return (
    <MessageListContainer>
      <Message fromMe={true}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Message>
      <Message>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Message>
      {renderChat()}
    </MessageListContainer>
  );
};

export default MessageList;
