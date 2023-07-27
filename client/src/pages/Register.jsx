import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #c33764; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #1d2671,
    #c33764
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #1d2671,
    #c33764
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-image: url("https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 30%;
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
  margin: 30px 10px 0px 0px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;
const Button = styled.button`
  width: 40%;
  padding: 15px 20px;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    background-color: darkred;
  }
`;
const Error = styled.span`
  color: red;
  font-size: 12px;
`;
const Linkto = styled.a`
  margin: 5px 0px;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
`;
const Spann = styled.span`
  margin: 5px 0px;
  font-size: 14px;
`;
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== cfPassword || email === "" || username === "") {
      setErr(true);
    } else {
      register(dispatch, { username, email, password });
      window.location.href = "/login";
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            placeholder="Confirm password"
            type="password"
            required
            onChange={(e) => setCfPassword(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister}>CREATE</Button>
          {err && <Error>Password and Confirm password must be match!</Error>}
          <Spann>Do you already have an account ?</Spann>
          <Link to="/login">
            <Linkto>Login</Linkto>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
