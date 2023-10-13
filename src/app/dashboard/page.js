"use client"; // This is a client component 👈🏽"
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Sidebar from "@/Component/Sidebar";
import ProductCard from "@/Component/ProductCard";
import ProductCardForCart from "@/Component/ProductCardForCart";
import withAuth from "@/lib/withAuth";
import { Button } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length) {
          setProducts(res.data);
        }
      });

    getCart();
    getOrder()
  }, []);

  const getCart = () => {
    fetch("api/carts/2")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setSelectedProducts(
            res.data?.products.reduce((result, item) => {
              result[item.productId] = item.quantity;
              return result;
            }, {})
          );
        }
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateCart = (productId, quantity) => {
    setSelectedProducts((prevSelectedProducts) => {
      // Update the state based on the previous state
      const updatedSelectedProducts = {
        ...prevSelectedProducts,
        [productId]: quantity,
      };

      // Make the API call using the updated state
      fetch("api/carts/2", {
        method: "PUT",
        body: JSON.stringify({
          userId: 2,
          date: "2019-12-10", // Fix: Use a string for the date
          products: Object.keys(updatedSelectedProducts).map((key) => ({
            productId: key,
            quantity: updatedSelectedProducts[key],
          })),
        }),
      })
        .then((res) => res.json())
        .then(() => getCart());

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
    fetch("api/orders/2", {
      method: "POST",
      body: JSON.stringify({
        userId: 2,
        date: "2019-12-10", // Fix: Use a string for the date
        products: Object.keys(selectedProducts).map((key) => ({
          productId: key,
          quantity: selectedProducts[key],
        })),
      }),
    })
      .then((res) => res.json())
      .then(() =>  getOrder());
  };

  const getOrder = () => {
    // Make the API call using the updated state
    fetch("api/orders/2")
      .then((res) => res.json())
      .then((res) => setOrders(res.data));
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[20%] h-screen flex flex-col justify-between border-r-2">
        <Sidebar />
      </div>
      <div className="w-[80%] h-screen overflow-auto">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              borderBottom: 1,
              position: "fixed",
              borderColor: "divider",
              bgcolor: "#FFF",
              zIndex: 2,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Products" {...a11yProps(0)} />
              <Tab label="Orders" {...a11yProps(1)} />
              <Tab label="Cart" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="flex flex-wrap mt-10">
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
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="mt-10">
              {orders.length &&
                orders.map((order, index) => {
                  return <div key={index}>{order._id} - {order.price} </div>;
                })}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="mt-10">
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
                    />
                  );
                })}
              <Button variant="outlined" onClick={() => createOrder()}>
                Order Now
              </Button>
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
