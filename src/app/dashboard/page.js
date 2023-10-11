"use client"; // This is a client component 👈🏽"
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import {
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FeedIcon from "@mui/icons-material/Feed";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FolderIcon from "@mui/icons-material/Folder";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

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
          <Typography>{children}</Typography>
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

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));

    getCart();
  }, []);

  const getCart = () => {
    fetch("https://fakestoreapi.com/carts/user/2")
      .then((res) => res.json())
      .then((json) => {
        setCarts(json[0]);
        setSelectedProducts(
          json[0]?.products.reduce((result, item) => {
            result[item.productId] = item.quantity;
            return result;
          }, {})
        );
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
      fetch("https://fakestoreapi.com/carts/2", {
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
        // .then(() => getCart());

      // Return the updated state
      return updatedSelectedProducts;
    });
  };

  const getProduct = (id) => {
    const matchingProducts = products.filter(
      (product) => product.id === Number(id)
    );
    return matchingProducts.length > 0 ? matchingProducts[0] : null;
  };

  console.log(products, carts, selectedProducts);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[20%] h-screen flex flex-col justify-between border-r-2">
        <div>
          <div className="text-2xl text-center">Demo</div>
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItemButton>
          </List>
        </div>
        <div>
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={() => router.push("/login")}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </div>
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
                    <div
                      key={index}
                      className="w-[24%] flex flex-col justify-between items-center box-border p-2 m-1 border-2"
                    >
                      <Image
                        src={product.image}
                        alt="Image"
                        width={100}
                        height="170"
                        className="h-[170px]"
                      />
                      <p
                        className="h-[3.4rem] overflow-hidden line-clamp-2 text-center py-2 mt-2 box-border"
                        title={product.title}
                      >
                        {product.title}
                      </p>
                      <p className="my-2 font-bold">₹{product.price}</p>

                      {!!selectedProducts[product.id] &&
                      selectedProducts[product.id] ? (
                        <div className="flex">
                          <IconButton
                            aria-label="delete"
                            disabled={!selectedProducts[product.id]}
                            color="primary"
                          >
                            <RemoveIcon
                              onClick={() =>
                                updateCart(
                                  product.id,
                                  selectedProducts[product.id] - 1
                                )
                              }
                            />
                          </IconButton>
                          <TextField
                            type="number"
                            value={selectedProducts[product.id]}
                            onChange={(e) =>
                              setSelectedProducts({
                                ...selectedProducts,
                                [product.id]: e.target.value,
                              })
                            }
                            size="small"
                            inputProps={{
                              style: {
                                width: 20,
                              },
                            }}
                          />
                          <IconButton
                            aria-label="delete"
                            color="primary"
                            onClick={() =>
                              updateCart(
                                product.id,
                                selectedProducts[product.id] + 1
                              )
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() => updateCart(product.id, 1)}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  );
                })}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="mt-10">
              {!!Object.keys(selectedProducts)?.length &&
                Object.keys(selectedProducts).map((product, index) => {
                  const renderProduct = getProduct(product);
                  return (
                    <div key={index} className="flex border-2 p-3 mb-3">
                      <Image
                        src={renderProduct?.image}
                        alt="Image"
                        width={150}
                        height="170"
                        className="h-[170px]"
                      />
                      <div className="w-[60%] px-3">
                        <div className="font-bold">{renderProduct?.title}</div>
                        <div className="text-sm">
                          {renderProduct?.description}
                        </div>
                      </div>
                      <div className="flex-grow flex justify-center items-center">
                        <IconButton
                          aria-label="delete"
                          disabled={!selectedProducts[product]}
                          color="primary"
                        >
                          <RemoveIcon
                            onClick={() =>
                              updateCart(product, selectedProducts[product] - 1)
                            }
                          />
                        </IconButton>
                        <TextField
                          type="number"
                          value={selectedProducts[product]}
                          onChange={(e) =>
                            setSelectedProducts({
                              ...selectedProducts,
                              [product]: e.target.value,
                            })
                          }
                          size="small"
                          inputProps={{
                            style: {
                              width: 20,
                            },
                          }}
                        />
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={() =>
                            updateCart(product, selectedProducts[product] + 1)
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}
