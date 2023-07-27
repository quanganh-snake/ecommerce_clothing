import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-size: 14px;
  font-weight: 600;
`;
const Announcement = () => {
  return <Container>Welcome to my shop ! Have a nice day ^^.</Container>;
};

export default Announcement;
