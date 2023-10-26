"use client"; // This is a client component 👈🏽"
import ProductCardForCart from "@/Component/ProductCardForCart";
import { createOrder, getCart, getProducts } from "@/utils/middleware";
import { Card, CardHeader, Table, Row, Button, Collapse, CardBody, UncontrolledTooltip, Badge, } from "reactstrap";
import { faChevronDown, faChevronRight, faLink, faListCheck, faPen, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = () => {
  const { products, selectedProducts, orders, carts } = useSelector(state => state.user)
  const [openOrder, setOpenOrder] = useState();

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
    <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0 space-between-div table-header-div">
            <h3 className="mb-0">Cart List</h3>
          </CardHeader>
          {carts?.length !== 0 ? <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope='col' >No.</th>
                <th scope='col' >Order ID </th>
                <th scope='col'>Items </th>
                <th scope='col'>Customers</th>
                <th scope='col'>Status</th>
                <th scope='col' >Total </th>
                <th scope='col' />
              </tr>
            </thead>
            <tbody>
              {carts.map((order, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="cursor-pointer" onClick={() => {
                      setOpenOrder(openOrder === order?._id ? '' : order?._id)
                      const matchingProducts = []
                      order.products.forEach(orderProduct => {
                        const matchProduct = products.filter((product) => product._id === orderProduct.productId)
                        if (matchProduct.length) { matchingProducts.push({ ...matchProduct[0], quantity: orderProduct.quantity }) }
                      })
                    }}>
                      <td className='serial-number'>{index + 1}</td>
                      <td>{order?._id}</td>
                      <td>{order?.products?.length}</td>
                      <td>{(order.userId?.firstname || '') + " " + (order.userId?.lastname || '')}</td>
                      <td>
                        <Badge className={order.completed ? 'badge-success' : "badge-warning"} style={{ fontSize: 12 }}>
                          {order.completed ? 'Completed' : 'Not Completed'}
                        </Badge>
                      </td>
                      <td>{order.price && `₹${order.price}`}</td>
                      <td className="text-right">
                        {!order.completed && <Button className="action-icon-btn">
                          <FontAwesomeIcon className="ml-1" icon={openOrder === order._id ? faChevronDown : faChevronRight} />
                        </Button>}
                      </td>
                    </tr>
                    <tr key={order.id + "-details"} className={openOrder === order?._id ? '' : 'd-none'}>
                      <td colSpan="11">
                        <Collapse isOpen={openOrder === order?._id}>
                          <Card>
                            <CardBody>
                              <div className="d-flex">
                                <div className="flex-grow-1 mr-4">
                                  <h5>Items:</h5>
                                  {Object.keys(selectedProducts)?.length > 0 ? (
                                    <table className="table table-bordered">
                                      <thead>
                                        <tr>
                                          <th>Name</th>
                                          <th>Quantity</th>
                                          <th>Price</th>
                                          <th>Total</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {Object.keys(selectedProducts)?.map((item, i) => {
                                          const renderProduct = getProduct(item)
                                          return <tr key={i}>
                                            <td>{renderProduct.title}</td>
                                            <td>{selectedProducts[item]}</td>
                                            <td>₹{renderProduct.salePrice}</td>
                                            <td>₹{renderProduct.salePrice * selectedProducts[item]}</td>
                                          </tr>
                                        })}
                                        <tr>
                                          <td colSpan="2" />
                                          <td>Total</td>
                                          <td>₹{order.price}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  ) : (
                                    <p>No items available</p>
                                  )}
                                  <div className="flex justify-end mt-2">
                                    <Button onClick={() => {
                                      setOpenOrder('')
                                      createOrder(selectedProducts)
                                    }}>Order Now</Button>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table> : null}
        </Card>
      </div>
    </Row>
  )
};

export default Cart
