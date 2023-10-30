"use client"; // This is a client component 👈🏽"
import { createOrder, getCart, getProducts, handleSortColumn, sortIcon } from "@/utils/middleware";
import { Card, CardHeader, Table, Row, Button, Collapse, CardBody, UncontrolledTooltip, Badge, } from "reactstrap";
import { faChevronDown, faChevronRight, faLink, faListCheck, faPen, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@/Component/Pagination";
import { Actions } from "@/redux/actions";
import { Store } from "@/redux/configureStore";
import SearchInput from "@/Component/SearchInput";

const Cart = () => {
  const { products, selectedProducts } = useSelector(state => state.user)
  const { page, totalPage, activeSort, sortOrder, search, carts } = useSelector(state => state.carts)
  const [openOrder, setOpenOrder] = useState();

  useEffect(() => {
    getCart(page, activeSort, sortOrder, search)
    if (!products?.length) {
      getProducts()
    }
  }, [page, activeSort, sortOrder, search])

  const getProduct = (id) => {
    const matchingProducts = products.filter((product) => product._id === id);
    return matchingProducts.length > 0 ? matchingProducts[0] : null;
  };

  useEffect(() => () => Store.dispatch({ type: Actions.Carts.CartReset }), [])

  return (
    <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0 space-between-div table-header-div">
            <h3 className="mb-0">Cart List</h3>
            <div className="right-div-wrap">
              <SearchInput action="Carts" />
            </div>
          </CardHeader>
          {carts?.length !== 0 ? <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope='col' className='serial-number cursor-pointer' onClick={() => handleSortColumn('', '', '', 'Carts')}>No.</th>
                <th scope='col' onClick={() => handleSortColumn('_id', activeSort, sortOrder, 'Carts')} >Order ID <FontAwesomeIcon icon={sortIcon(activeSort, '_id', sortOrder)} /></th>
                <th scope='col'>Items </th>
                <th scope='col'>Customers </th>
                <th scope='col'>Status </th>
                <th scope='col' onClick={() => handleSortColumn('price', activeSort, sortOrder, 'Carts')} >Total <FontAwesomeIcon icon={sortIcon(activeSort, 'price', sortOrder)} /></th>
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
                      <td>{(order.user?.firstname || '') + " " + (order.user?.lastname || '')}</td>
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
                                      createOrder(selectedProducts, page)
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
          <Pagination page={page} totalPage={totalPage} handlePageClick={({ selected }) => Store.dispatch({ type: Actions.Carts.SetPage, payload: selected + 1 })} />
        </Card>
      </div>
    </Row>
  )
};

export default Cart
