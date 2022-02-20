import React from "react";
import styled from "styled-components";
import KiwiTalkieLogo from "components/KiwiTalkieLogo";

const HeaderContainer = styled.div`
  height: 70px;
  background-color: #1d2437;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  height: 35px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <KiwiTalkieLogo />
      </LogoContainer>
    </HeaderContainer>
  );
};

export default Header;
