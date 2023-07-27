import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { deleteUser, getUsers } from "../../redux/apiCalls";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    const result = window.confirm("Are you sure you want to delete this user?");
    if (result) {
      deleteUser(id, dispatch);
      window.location.reload("/users");
    } else {
      return;
    }
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 280 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113__340.png"
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id || row._id + row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
