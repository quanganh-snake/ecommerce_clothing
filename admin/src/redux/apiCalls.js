import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from "./userRedux";

export const login = async (dispatch, user, callback) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    console.log("logined");
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};
//update product
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products/`, product);

    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUsersFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUsersStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUsersSuccess(id));
  } catch (error) {
    dispatch(deleteUsersFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/auth/register/`, user);

    dispatch(addUserSuccess(res.data));
  } catch (error) {
    dispatch(addUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
