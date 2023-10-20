import { Button, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import React from "react";

export default function ProductCard({
  key,
  product,
  selectedProducts,
  setSelectedProducts,
  updateCart,
}) {
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
