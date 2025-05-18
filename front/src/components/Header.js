import React from "react";
import styled from "styled-components";
import KiwiTalkieLogo from "components/KiwiTalkieLogo";

const HeaderContainer = styled.div`
  positin: relative;
  height: 70px;
  background-color: #1d2437;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  height: 35px;
`;

const RoomContainer = styled.div`
  position: absolute;
  right: 0;
  margin-right: 10px;
  color: #373e53;
  font-weight: bold;
`;

const Header = ({ room }) => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <KiwiTalkieLogo />
      </LogoContainer>
      {room && <RoomContainer>{`Room #${room}`}</RoomContainer>}
    </HeaderContainer>
  );
};

export default Header;
