import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
`;
const Input = styled.input`
  width: 50%;
  height: 10px;
  margin-right: 10px;
  padding: 20px;
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

const JoinRoomButton = styled.button`
  width: 50%;
  height: 50px;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #32de84;
  color: white;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const InputRoom = ({ handleJoinRoom }) => {
  const [input, setInput] = useState("");
  return (
    <InputContainer>
      <Input
        maxLength={3}
        onKeyDown={(e) => {
          if (!(e.key.match(/^[0-9\b]+$/) || e.key === "Backspace")) {
            e.preventDefault();
          }
          if (e.key === "Enter") {
            handleJoinRoom(input);
          }
        }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <JoinRoomButton onClick={() => handleJoinRoom(input)}>
        Join Room
      </JoinRoomButton>
    </InputContainer>
  );
};

export default InputRoom;
