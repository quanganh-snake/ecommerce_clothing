// import Sidebar from "./components/sidebar/Sidebar";
// import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
// import { useSelector } from "react-redux";
// import ProtectRoute from "./components/protectRoute";
import { LayoutProtect } from "./components/layout";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        <Route
          path="/"
          element={
            <LayoutProtect>
              <Home />
            </LayoutProtect>
          }
        ></Route>
        <Route
          path="/users"
          element={
            <LayoutProtect>
              <UserList />
            </LayoutProtect>
          }
        ></Route>
        <Route
          path="/user/:userId"
          element={
            <LayoutProtect>
              <User />
            </LayoutProtect>
          }
        ></Route>
        <Route
          path="/newUser"
          element={
            <LayoutProtect>
              <NewUser />
            </LayoutProtect>
          }
        ></Route>
        <Route
          path="/products"
          element={
            <LayoutProtect>
              <ProductList />
            </LayoutProtect>
          }
        ></Route>
        <Route
          path="/product/:productId"
          element={
            <LayoutProtect>
              <Product />
            </LayoutProtect>
          }
        ></Route>
        <Route
          path="/newproduct"
          element={
            <LayoutProtect>
              <NewProduct />
            </LayoutProtect>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
