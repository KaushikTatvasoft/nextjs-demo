"use client"; // This is a client component 👈🏽"
import ProductCard from "@/Component/ProductCard";
import { getCart, getProducts } from "@/utils/middleware";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Row } from "reactstrap";

const Products = () => {
  const {products} = useSelector(state => state.user)

  useEffect(() => {
    getProducts()
    getCart()
  }, [])

  return (
    <>
      <div className="subscription-list-wrapper">
        <Card className="shadow">
          <CardHeader className="space-between-div table-header-div">
            <h3 className="mb-0">Product List</h3>
          </CardHeader>
          <CardBody>
            <Row className="subscription-row">
              {products?.length !== 0 && products.map((product, index) => {
                return (
                  <ProductCard key={index} product={product} />
                );
              })}
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Products
