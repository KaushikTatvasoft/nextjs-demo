"use client"; // This is a client component 👈🏽"
import { getOrder, getProducts, handleSortColumn, sortIcon } from "@/utils/middleware";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, Table, Row, Button, Collapse, CardBody, UncontrolledTooltip, Badge, } from "reactstrap";
import { faChevronDown, faChevronRight, faLink, faListCheck, faPen, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/Component/Pagination";
import { Store } from "@/redux/configureStore";
import { Actions } from "@/redux/actions";
import SearchInput from "@/Component/SearchInput";

const Orders = () => {
  const { products } = useSelector(state => state.user)
  const { orders, totalPage, search, activeSort, sortOrder, page } = useSelector(state => state.orders)
  const [openOrder, setOpenOrder] = useState();
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    getOrder(page, activeSort, sortOrder, search)
    if (!products?.length) {
      getProducts()
    }
  }, [page, activeSort, sortOrder, search])

  useEffect(() => () => Store.dispatch({ type: Actions.Orders.OrderReset }), [])

  return <div>
    <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0 space-between-div table-header-div">
            <h3 className="mb-0">Orders List</h3>
            <div className="right-div-wrap">
              <SearchInput action="Orders" />
            </div>
          </CardHeader>
          {orders?.length !== 0 ? <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope='col' className='serial-number cursor-pointer' onClick={() => handleSortColumn('', '', '', 'Orders')}>No.</th>
                <th scope='col' onClick={() => handleSortColumn('_id', activeSort, sortOrder, 'Orders')}>Order ID <FontAwesomeIcon icon={sortIcon(activeSort, '_id', sortOrder)} /></th>
                <th scope='col'>Items </th>
                <th scope='col'>Customers </th>
                <th scope='col' onClick={() => handleSortColumn('price', activeSort, sortOrder, 'Orders')}>Total <FontAwesomeIcon icon={sortIcon(activeSort, 'price', sortOrder)} /></th>
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
                      <td>{(order.user?.firstname || '') + " " + (order.user?.lastname || '')}</td>
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
                                            <td>₹{item.salePrice}</td>
                                            <td>₹{item.salePrice * item.quantity}</td>
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
          <Pagination page={page} totalPage={totalPage} handlePageClick={({ selected }) => Store.dispatch({ type: Actions.Orders.SetPage, payload: selected + 1 })} />
        </Card>
      </div>
    </Row>
  </div >
};

export default Orders
