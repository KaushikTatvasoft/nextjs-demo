"use client"; // This is a client component 👈🏽"
import React, { useEffect, useState } from "react";
import Sidebar from "@/Component/Sidebar";
import ProductCard from "@/Component/ProductCard";
import ProductCardForCart from "@/Component/ProductCardForCart";
import withAuth from "@/lib/withAuth";
import { Button } from "@mui/material";
import API, { handleError, handleSuccess } from "@/lib/common";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    if (!selectedIndex) {
      getProducts()
    } else if (selectedIndex === 1) {
      getOrder()
    } else {
      getCart();
    }
  }, [selectedIndex]);

  const getProducts = () => {
    API('GET', "/api/products")
      .then((res) => {
        handleSuccess(res)
        if (res?.data?.data?.length) {
          setProducts(res.data.data);
        }
      }).catch(err => handleError(err))
  }

  const getCart = () => {
    API('GET', "api/carts/2")
      .then((res) => {
        handleSuccess(res)
        if (res.data.data) {
          setSelectedProducts(
            res.data.data?.products.reduce((result, item) => {
              result[item.productId] = item.quantity;
              return result;
            }, {})
          );
        }
      }).catch(err => handleError(err))
  };

  const updateCart = (productId, quantity) => {
    setSelectedProducts((prevSelectedProducts) => {
      // Update the state based on the previous state
      const updatedSelectedProducts = {
        ...prevSelectedProducts,
        [productId]: quantity,
      };

      // Make the API call using the updated state
      API('PUT', "api/carts/2", {
        userId: 2,
        date: "2019-12-10", // Fix: Use a string for the date
        products: Object.keys(updatedSelectedProducts).map((key) => ({
          productId: key,
          quantity: updatedSelectedProducts[key],
        })),
      })
        .then(() => getCart()).catch(err => handleError(err))

      // Return the updated state
      return updatedSelectedProducts;
    });
  };

  const getProduct = (id) => {
    const matchingProducts = products.filter((product) => product._id === id);
    return matchingProducts.length > 0 ? matchingProducts[0] : null;
  };

  const createOrder = () => {
    // Make the API call using the updated state
    API('POST', "api/orders/2", {
      userId: 2,
      date: "2019-12-10", // Fix: Use a string for the date
      products: Object.keys(selectedProducts).map((key) => ({
        productId: key,
        quantity: selectedProducts[key],
      })),
    })
      .then(() => getOrder()).catch(err => handleError(err))
  };

  const getOrder = () => {
    // Make the API call using the updated state
    API('GET', "api/orders/2").then((res) => {
      handleSuccess(res)
      setOrders(res.data.data)
    }).catch(err => handleError(err))
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[20%] h-screen flex flex-col justify-between border-r-2">
        <Sidebar selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      </div>
      <div className="w-[80%] h-screen overflow-auto">
        {selectedIndex === 0 && <div className="flex flex-wrap">

          {!!products.length &&
            products.map((product, index) => {
              return (
                <ProductCard
                  key={index}
                  product={product}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  updateCart={updateCart}
                />

              );
            })}
        </div>}
        {selectedIndex === 1 && <div>
          {orders.length &&
            orders.map((order, index) => {
              return <div key={index}>{order._id} - {order.price} </div>;
            })}
        </div>}
        {selectedIndex === 2 && <div>
          {!!Object.keys(selectedProducts)?.length &&
            Object.keys(selectedProducts).map((product, index) => {
              const renderProduct = getProduct(product);
              return (
                <ProductCardForCart
                  key={index}
                  product={product}
                  renderProduct={renderProduct}
                  updateCart={updateCart}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              );
            })}
          <Button variant="outlined" onClick={() => createOrder()}>
            Order Now
          </Button>
        </div>}
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
