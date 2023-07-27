import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import ProductItem from "./ProductItem";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 25px;
  flex-wrap: wrap;
  justify-content: center;
`;
const Products = ({ cat, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteresProducts, setFilteredProducts] = useState([]);

  //get products or category
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:8000/api/products?category=${cat}`
            : `http://localhost:8000/api/products`
        );
        setProducts(res.data);
      } catch (error) {}
    };
    getProducts();
  }, [cat]);

  //filter products key, value
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filter]);

  //filter product price
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteresProducts.map((popularProduct) => (
            <ProductItem
              popularProduct={popularProduct}
              key={popularProduct.id}
            />
          ))
        : products
            .slice(0, 15)
            .map((popularProduct) => (
              <ProductItem
                popularProduct={popularProduct}
                key={popularProduct.id}
              />
            ))}
    </Container>
  );
};

export default Products;
