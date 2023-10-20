// pages/api/login.js
import dbConnect from "@/lib/dbConnect";
import Carts from '../../../../Models/carts'
import { NextResponse } from "next/server";

export async function GET(req, params) {
  try {
    await dbConnect();

    if (!params.params.userId) {
      return NextResponse.json(
        { message: "Missing 'id' parameter in the request URL" },
        { status: 400 }
      );
    }

    // Use bcrypt or another secure password hashing library for real-world applications
    const carts = await Carts.findOne(params.params);

    return NextResponse.json(
      { data: carts , message: "Cart fetch Successfully" },
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

export async function PUT(req, params) {
  try {
    await dbConnect();

    // Assuming you're sending JSON data in the request body
    const reqData = await req.json();

    // Validate the request body
    if (!reqData.products || !Array.isArray(reqData.products)) {
      return NextResponse.json(
        { message: "'products' field must be an array of objects" },
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

    // Update data in the Carts table based on userId
    const updatedCart = await Carts.findOneAndUpdate(
      { userId: params.params.userId },
      { products: reqData.products },
      { new: true, upsert: true } // 'new' returns the modified document, 'upsert' creates a new document if it doesn't exist
    );

    return NextResponse.json(
      { data: updatedCart, message: "Cart updated successfully" },
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