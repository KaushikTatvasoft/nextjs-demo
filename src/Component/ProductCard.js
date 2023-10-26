"use client"; // This is a client component 👈🏽"
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import React from "react";
import { Button, Card, CardBody, CardHeader, CardFooter, CardTitle, Col, Row } from "reactstrap";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Store } from "@/redux/configureStore";
import { Actions } from "@/redux/actions";
import { updateCart } from "@/utils/middleware";

export default function ProductCard({
  key,
  product,
}) {
  const { selectedProducts } = useSelector(state => state.user)

  return (
    <Col className="subscription-col">
      <Card className={`card-stats items-center`}>
        <CardHeader className="">
          <Row className="align-items-center">
            <div className="col">
              <CardTitle tag="div" className="text-uppercase font-weight-bold m-0 align-items-center flex h5">
                <span className="mr-2">{product?.title}</span>
              </CardTitle>
            </div>
            <Col className="h2 col-auto m-0">
              <div className="price">
                ₹{product.salePrice}
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <>
            <Row className="title-row">
              <Image
                src={product.image}
                alt="Image"
                width={200}
                height={280}
                className="h-[280px] mb-[5px]"
              />
            </Row>
          </>
        </CardBody>
        <CardFooter>
          {!!selectedProducts?.[product._id] && selectedProducts[product._id] ? (
            <div className="flex">
              <Button color="primary" size="sm" onClick={() =>
                updateCart(selectedProducts, product._id, selectedProducts[product._id] - 1)
              }>
                -
              </Button>
              <TextField
                type="number"
                value={selectedProducts?.[product._id]}
                onChange={(e) =>
                  Store.dispatch({
                    type: Actions.User.SetSelectedProducts, payload: {
                      ...selectedProducts,
                      [product._id]: e.target.value,
                    }
                  })
                }
                size="small"
                className="mr-2"
                inputProps={{
                  style: {
                    width: 20,
                  },
                }}
              />
              <Button color="primary" size="sm" onClick={() =>
                updateCart(selectedProducts, product._id, selectedProducts[product._id] + 1)
              }>
                +
              </Button>
            </div>
          ) : (
            <Button variant="outlined" onClick={() => updateCart(selectedProducts, product._id, 1)}>
              Add to Cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </Col>
  )
}
