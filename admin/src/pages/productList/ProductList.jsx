import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const notify = () => toast("Xóa sản phẩm thành công!");
  const handleDelete = (id) => {
    const result = window.confirm("Are you sure you want to delete this item?");
    if (result) {
      deleteProduct(id, dispatch);
      notify();
      window.location.replace("/products");
    } else {
      return;
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },

    {
      field: `price`,
      headerName: "Price ($)",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
            <ToastContainer
              position="top-right"
              autoClose={800}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id || row._id + row.title}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
