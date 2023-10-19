// pages/api/orders.js
import dbConnect from "@/lib/dbConnect";
import Orders from '../../../../Models/orders';
import Carts from '../../../../Models/carts';
import Products from '../../../../Models/products';
import { NextResponse } from "next/server";
import authenticate from "@/lib/authMiddleware";

export async function GET(req, params) {
  try {
    await dbConnect();

    const authenticated = await authenticate(req);

    if (typeof authenticated === 'object') {
      return authenticated
    }

    if (!params.params.userId) {
      return NextResponse.json(
        { message: "Missing 'userId' parameter in the request URL" },
        { status: 400 }
      );
    }

    // Use bcrypt or another secure password hashing library for real-world applications
    const orders = await Orders.find(params.params);

    return NextResponse.json(
      { data: orders, message: "Order fetch Successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req, params) {
  try {
    await dbConnect();

    const authenticated = await authenticate(req);

    if (typeof authenticated === 'object') {
      return authenticated
    }

    if (!params.params.userId) {
      return NextResponse.json(
        { message: "Missing 'id' parameter in the request URL" },
        { status: 400 }
      );
    }

    // Assuming you're sending JSON data in the request body
    const reqData = await req.json();

    // Validate the request body
    if (!Array.isArray(reqData.products)) {
      return NextResponse.json(
        { message: "'userId' and 'products' fields are required" },
        { status: 400 }
      );
    }

    // Validate each product in the array
    const isValidProduct = reqData.products.every(product => {
      return (
        typeof product === 'object' &&
        'productId' in product &&
        'quantity' in product &&
        typeof product.productId === 'string' &&
        typeof product.quantity === 'number'
      );
    });

    if (!isValidProduct) {
      return NextResponse.json(
        { message: "Invalid format for 'products' array" },
        { status: 400 }
      );
    }

    // Calculate the total price based on the products array
    const totalPrice = await Promise.all(reqData.products.map(async product => {
      const productDetails = await Products.findOne({ _id: product.productId });
      return productDetails ? productDetails.price * product.quantity : 0;
    })).then(prices => prices.reduce((total, price) => total + price, 0));

    // Add data to the Orders table
    const newOrder = await Orders.create({
      userId: params.params.userId,
      products: reqData.products,
      price: totalPrice,
    });

    console.log(newOrder,"newOrder");
    await Carts.findOneAndUpdate({
      userId: params.params.userId,
      completed: true,
      orderId:newOrder._id
    });

    return NextResponse.json(
      { data: newOrder, message: "Order added successfully" },
      { status: 201 } // 201 Created status code
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
