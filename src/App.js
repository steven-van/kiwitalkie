import React from "react";
import "./App.css";
import Header from "components/Header";
import styled from "styled-components";
import InputChat from "components/InputChat";
import MessageList from "components/MessageList";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  height: 100vh;
  margin: auto;
`;
const App = () => {
  return (
    <Page>
      <Header />
      <MessageList />
      <InputChat />
    </Page>
  );
};

export default App;
