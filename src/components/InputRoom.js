import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 30%;
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
  width: 30%;
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

const InputRoom = ({ handleRoomInputChange, handleJoinRoom }) => {
  return (
    <>
      <Input
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleJoinRoom();
          }
        }}
        onChange={(e) => handleRoomInputChange(e.target.value)}
      />
      <JoinRoomButton onClick={() => handleJoinRoom()}>
        Join Room
      </JoinRoomButton>
    </>
  );
};

export default InputRoom;
