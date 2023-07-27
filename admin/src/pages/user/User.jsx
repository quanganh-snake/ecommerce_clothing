import {
  AccountCircleOutlined,
  MailOutline,
  PermIdentity,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { updateUser } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethods";

import { ToastContainer, toast } from "react-toastify";
import "./user.css";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );
  const [inputs, setInputs] = useState({});
  const [userupdate, setUserud] = useState({});
  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const notify = () => toast("Cập nhật thông tin user thành công!");
  const handleUpdate = (e) => {
    e.preventDefault();
    const userUd = { ...inputs };
    const result = window.confirm("Are you sure you want to update this user?");
    if (result) {
      updateUser(userId, userUd, dispatch);
      notify();
      getUs();
    } else {
      return;
    }
  };
  const getUs = async () => {
    try {
      const res = await userRequest.get("/users/find/" + userId);
      setUserud(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113__340.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {user?.username || userupdate.username}
              </span>
              {user?.isAdmin === true || userupdate.isAdmin === true ? (
                <span className="userShowUserTitle">Admin</span>
              ) : (
                <span className="userShowUserTitle">Customer</span>
              )}
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user?.username || userupdate.username}
              </span>
            </div>
            <div className="userShowInfo">
              <AccountCircleOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">
                Admin:
                {user?.isAdmin.toString() || userupdate.isAdmin.toString()}
              </span>
            </div>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user?.email || userupdate.email}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder={user?.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={user?.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>

              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Admin</label>
                <select name="isAdmin" id="active" onChange={handleChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <button className="userUpdateButton" onClick={handleUpdate}>
                Update
              </button>
              <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
