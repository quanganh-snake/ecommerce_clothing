import { Add, Remove } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethod";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 35px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;

  &:focus {
    width: 25px;
    height: 25px;
    border: solid 2px teal;
  }
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 3px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid gray;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  padding: 10px;
  border: 1px solid gray;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.25s ease-in-out;
  &:hover {
    background-color: teal;
    color: white;
  }
`;
const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    //update cart
    dispatch(addProduct({ ...product, quantity, size, color }));
  };
  const notify = () => toast("The product has been added to cart!");

  return (
    <Container>
      <Navbar />
      <Announcement />

      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color: </FilterTitle>
              {product.color?.map((c) => (
                <FilterColor
                  tabIndex={1}
                  color={c}
                  key={c}
                  onClick={() => setColor(c)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>

          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button
              onClick={() => {
                handleAddToCart();
                notify();
              }}
            >
              ADD TO CART
            </Button>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </AddContainer>
        </InfoContainer>
      </Wrapper>

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
