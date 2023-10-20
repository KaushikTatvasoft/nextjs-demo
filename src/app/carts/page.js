"use client"; // This is a client component 👈🏽"
import ProductCardForCart from "@/Component/ProductCardForCart";
import { createOrder, getCart, getProducts } from "@/utils/middleware";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

const Cart = () => {
  const { products, selectedProducts } = useSelector(state => state.user)

  useEffect(() => {
    getCart()
    if (!products?.length) {
      getProducts()
    }
  }, [])

  const getProduct = (id) => {
    const matchingProducts = products.filter((product) => product._id === id);
    return matchingProducts.length > 0 ? matchingProducts[0] : null;
  };

  return (
    <div className="flex flex-col justify-center items-end">
      {selectedProducts && !!Object.keys(selectedProducts)?.length &&
        Object.keys(selectedProducts).map((product, index) => {
          const renderProduct = getProduct(product);
          return (
            <ProductCardForCart
              key={index}
              product={product}
              renderProduct={renderProduct}
              selectedProducts={selectedProducts}
            />
          );
        })}
      <Button onClick={() => createOrder(selectedProducts)}>Order Now</Button>
    </div>
  )
};

export default Cart
