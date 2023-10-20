"use client"; // This is a client component 👈🏽"
import { getOrder, getProducts } from "@/utils/middleware";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, Table, Row, Button, Collapse, CardBody, UncontrolledTooltip, Badge, } from "reactstrap";
import { faChevronDown, faChevronRight, faLink, faListCheck, faPen, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const { products, orders } = useSelector(state => state.user)
  const [openOrder, setOpenOrder] = useState();
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    getOrder()
    if (!products?.length) {
      getProducts()
    }
  }, [])

  return <div>
    <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0 space-between-div table-header-div">
            <h3 className="mb-0">Orders List</h3>
          </CardHeader>
          {orders?.length !== 0 ? <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope='col' >No.</th>
                <th scope='col' >Order ID </th>
                <th scope='col'>Items </th>
                <th scope='col'>Customers</th>
                <th scope='col' >Total </th>
                <th scope='col' />
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="cursor-pointer" onClick={() => {
                      setOpenOrder(openOrder === order?._id ? '' : order?._id)
                      const matchingProducts = []
                      order.products.forEach(orderProduct => {
                        const matchProduct = products.filter((product) => product._id === orderProduct.productId)
                        if (matchProduct.length) { matchingProducts.push({ ...matchProduct[0], quantity: orderProduct.quantity }) }
                      })
                      setSelectedProduct(matchingProducts)
                    }}>
                      <td className='serial-number'>{index + 1}</td>
                      <td>{order?._id}</td>
                      <td>{order?.products?.length}</td>
                      <td>{order.userId}</td>
                      <td>{order.price && `₹${order.price}`}</td>
                      <td className="text-right">
                        <Button className="action-icon-btn">
                          <FontAwesomeIcon className="ml-1" icon={openOrder === order._id ? faChevronDown : faChevronRight} />
                        </Button>
                      </td>
                    </tr>
                    <tr key={order.id + "-details"} className={openOrder === order?._id ? '' : 'd-none'}>
                      <td colSpan="11">
                        <Collapse isOpen={openOrder === order?._id}>
                          <Card>
                            <CardBody>
                              <div className="d-flex">
                                <div className="flex-grow-1 mr-4">
                                  <h5>Order Items:</h5>
                                  {selectedProduct?.length > 0 ? (
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
                                        {selectedProduct?.map((item, i) => (
                                          <tr key={i}>
                                            <td>{item.title}</td>
                                            <td>{item.quantity}</td>
                                            <td>₹{item.price}</td>
                                            <td>₹{item.price * item.quantity}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  ) : (
                                    <p>No order items available</p>
                                  )}
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
  </div >
};

export default Orders
