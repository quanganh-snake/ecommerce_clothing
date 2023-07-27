import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("https://cdn.pixabay.com/photo/2018/04/05/14/09/sunflowers-3292932_960_720.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  ${mobile({ width: "70%" })}
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 30px 0px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  width: 40%;
  padding: 15px 20px;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.25s ease;
  &:hover {
    background-color: darkred;
  }
  &:disabled {
    color: teal;
    cursor: not-allowed;
  }
`;
const Linkto = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
  font-size: 12px;
`;
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>LOGIN</Button>
          {error && <Error>Something went wrong...</Error>}
          <Linkto>DO NOT YOU REMEMBER THE PASSWORD?</Linkto>
          <Link to="/register">
            <Linkto>CREATE A NEW ACCOUNT</Linkto>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
