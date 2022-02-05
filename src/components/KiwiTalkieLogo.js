import React from "react";
import kiwiTalkieLogo from "assets/kiwitalkie-logo.png";
import styled from "styled-components";

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const KiwiTalkieLogo = () => {
  return <Logo src={kiwiTalkieLogo} alt="KiwiTalkie Logo" />;
};

export default KiwiTalkieLogo;
