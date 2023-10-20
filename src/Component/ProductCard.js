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
                ₹{product.price}
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
  return (
    <div className="w-1/4">
      <div className="p-4">
        <Image
          src={product.image}
          alt="Image"
          width={200}
          height={280}
          className="h-[280px] mb-[5px]"
        />
        <div className="pb-[5px] overflow-hidden block">{product.title}</div>
        <div className="pr-[10px] my-[3px] flex items-center">
          <span className="text-base font-medium">{`₹${product.salePrice}`}</span>
          <span className="ml-2 line-through text-base text-gray-600">{`₹${product.price}`}</span>
          <span className="ml-2 text-green-700 text-[13px] font-semibold tracking-tighter">{(((product.price - product.salePrice) / product.price) * 100).toFixed(2) + '% off'}</span>
        </div>
        <div className="mt-[5px] text-stock-alert text-xs font-bold">
          <div>{product.stockStatus}</div>
        </div>
        {!!selectedProducts[product._id] && selectedProducts[product._id] ? (
          <div className="flex">
            <IconButton
              aria-label="delete"
              disabled={!selectedProducts[product._id]}
              color="primary"
            >
              <RemoveIcon
                onClick={() =>
                  updateCart(product._id, selectedProducts[product._id] - 1)
                }
              />
            </IconButton>
            <TextField
              type="number"
              value={selectedProducts[product._id]}
              onChange={(e) =>
                setSelectedProducts({
                  ...selectedProducts,
                  [product._id]: e.target.value,
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
                updateCart(product._id, selectedProducts[product._id] + 1)
              }
            >
              <AddIcon />
            </IconButton>
          </div>
        ) : (
          <Button variant="outlined" onClick={() => updateCart(product._id, 1)}>
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  )
  return (
    <div
      key={key}
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

      {!!selectedProducts[product._id] && selectedProducts[product._id] ? (
        <div className="flex">
          <IconButton
            aria-label="delete"
            disabled={!selectedProducts[product._id]}
            color="primary"
          >
            <RemoveIcon
              onClick={() =>
                updateCart(product._id, selectedProducts[product._id] - 1)
              }
            />
          </IconButton>
          <TextField
            type="number"
            value={selectedProducts[product._id]}
            onChange={(e) =>
              setSelectedProducts({
                ...selectedProducts,
                [product._id]: e.target.value,
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
              updateCart(product._id, selectedProducts[product._id] + 1)
            }
          >
            <AddIcon />
          </IconButton>
        </div>
      ) : (
        <Button variant="outlined" onClick={() => updateCart(product._id, 1)}>
          Add to Cart
        </Button>
      )}
    </div>
  );
}
