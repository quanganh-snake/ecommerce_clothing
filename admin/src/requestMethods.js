import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// console.log("TOKEN", TOKEN);
// e set vao LocalStorage luc nao the
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  console.log("getToken", currentUser); // undefine herw
  return currentUser?.accessToken;
};
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${getToken()}`,
  },
});
