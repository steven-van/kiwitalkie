import React from "react";
import sendArrow from "assets/send-arrow.svg";
import styled from "styled-components";

const InputContainer = styled.div`
  height: 100px;
  display: flex;
  background-color: #222a3f;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 60%;
  padding: 20px;
  margin-right: 10px;
  outline: none;
  border: 0;
  color: white;
  background-color: #1d2437;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  ::placeholder {
    color: #373e53;
  }
`;

const SubmitButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #32de84;

  &:hover {
    cursor: pointer;
  }
`;

const InputChat = ({ message, handleMsgInputChange, handleMessageSubmit }) => {
  return (
    <InputContainer>
      <Input
        placeholder="Type your message..."
        value={message.text}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleMessageSubmit();
          }
        }}
        onChange={(e) => handleMsgInputChange(e.target.value)}
      />
      <SubmitButton onClick={() => handleMessageSubmit()}>
        <img src={sendArrow} style={{ width: "70%" }} alt="Send Arrow"></img>
      </SubmitButton>
    </InputContainer>
  );
};

export default InputChat;
