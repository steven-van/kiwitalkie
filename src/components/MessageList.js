import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Message from "components/Message";

const MessageListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #222a3f;
  padding: 30px;
  flex: 1;
  overflow-y: auto;
`;

const RoomContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 10px;
  color: #373e53;
  font-weight: bold;
`;

const MessageList = ({ messages, room }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderChat = () => {
    const renderedMessages = messages.map((message, index) => {
      return (
        <Message
          ref={endRef}
          key={index}
          username={message.username}
          timestamp={message.timestamp}
        >
          {message.text}
        </Message>
      );
    });
    return renderedMessages;
  };

  return (
    <MessageListContainer>
      {room && (
        <RoomContainer>
          <span style={{ position: "fixed" }}>{`Room #${room}`}</span>
        </RoomContainer>
      )}
      {renderChat()}
    </MessageListContainer>
  );
};

export default MessageList;
