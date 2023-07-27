import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  &:hover {
  }
`;
const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;
const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  console.log(data);
  console.log(orderId);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };
  return (
    <Container>
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Button onClick={routeChange}>Go to Homepage</Button>
    </Container>
  );
};

export default Success;
