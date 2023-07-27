import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const handleClick = async (e) => {
    e.preventDefault();
    await login(dispatch, { username, password });
  };

  console.log("user::", user);

  if (user?.currentUser?.accessToken) {
    window.location.replace("/");
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>ADMIN</h1>
      <input
        style={{ padding: 10, marginBottom: 20, marginTop: 20 }}
        type="text"
        placeholder="Username..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
