import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./newUser.css";

export default function NewUser() {
  const [inputs, setinputs] = useState({});
  const dispatch = useDispatch();
  const notify = () => toast("Thêm mới user thành công!");
  const handleChange = (e) => {
    setinputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const user = { ...inputs };
    addUser(user, dispatch);
    if (addUser(user, dispatch)) {
      notify();
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="john"
            required
            onChange={handleChange}
          />
        </div>

        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="john@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="password"
            onChange={handleChange}
          />
        </div>

        <div className="newUserItem">
          <label>Admin</label>
          <select
            className="newUserSelect"
            name="isAdmin"
            id="active"
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleCreate}>
          Create
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
      </form>
    </div>
  );
}
