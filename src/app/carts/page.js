"use client"; // This is a client component 👈🏽"
import { createOrder } from "@/utils/middleware";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

const Cart = () => {
  const { selectedProducts } = useSelector(state => state.user)

  return <Button onClick={() => createOrder(selectedProducts)}>Order Now</Button>
};

export default Cart
