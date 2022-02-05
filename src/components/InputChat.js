import React from "react";
import sendArrow from "assets/send-arrow.svg";
import styled from "styled-components";

const InputContainer = styled.div`
  height: 100px;
  display: flex;
  background-color: #f7f7cf;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 60%;
  padding: 20px;
  margin-right: 10px;
  outline: none;
  border: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #a3da8d;
  &:hover {
    cursor: pointer;
  }
`;

const InputChat = () => {
  return (
    <InputContainer>
      <Input placeholder="Type your message..." />
      <SubmitButton>
        <img src={sendArrow} style={{ width: "70%" }} alt="Send Arrow"></img>
      </SubmitButton>
    </InputContainer>
  );
};

export default InputChat;
