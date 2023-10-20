import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import React from "react";
import { updateCart } from "@/utils/middleware";
import { Store } from "@/redux/configureStore";
import { Actions } from "@/redux/actions";

export default function ProductCardForCart({
  key,
  product,
  renderProduct,
  selectedProducts
}) {
  return (
    <div key={key} className="flex border-2 p-3 mb-3 rounded-full">
      <Image
        src={renderProduct?.image}
        alt="Image"
        width={150}
        height="170"
        className="h-[170px]"
      />
      <div className="w-[60%] px-3">
        <div className="font-bold">{renderProduct?.title}</div>
        <div className="text-sm">{renderProduct?.description}</div>
      </div>
      <div className="flex-grow flex justify-center items-center">
        <IconButton
          aria-label="delete"
          disabled={!selectedProducts?.[product]}
          color="primary"
        >
          <RemoveIcon
            onClick={() => updateCart(selectedProducts,product, selectedProducts[product] - 1)}
          />
        </IconButton>
        <TextField
          type="number"
          value={selectedProducts[product]}
          onChange={(e) =>
            Store.dispatch({
              type: Actions.User.SetSelectedProducts, payload: {
                ...selectedProducts,
                [product]: e.target.value,
              }
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
          onClick={() => updateCart(selectedProducts, product, selectedProducts[product] + 1)}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
}
