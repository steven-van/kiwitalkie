import React from "react";
import styled from "styled-components";
import KiwiTalkieLogo from "./KiwiTalkieLogo";

const Container = styled.div`
  height: 70px;
  background-color: #d3eca7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  height: 50px;
`;

const Header = () => {
  return (
    <Container>
      <LogoContainer>
        <KiwiTalkieLogo />
      </LogoContainer>
    </Container>
  );
};

export default Header;
