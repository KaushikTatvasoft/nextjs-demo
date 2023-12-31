// pages/api/login.js
import dbConnect from "@/lib/dbConnect";
import Carts from '../../../../Models/carts';
import Products from '../../../../Models/products';
import { NextResponse } from "next/server";
import authenticate from "@/lib/authMiddleware";
import { pageSize } from "@/constants/general";
import { Types } from "mongoose";

export async function GET(req, params) {
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

    // Pagination parameters
    const page = req?.nextUrl?.searchParams.get("page")

    // Sorting parameters
    const activeSort = req?.nextUrl?.searchParams.get("activeSort");
    const sortOrder = req?.nextUrl?.searchParams.get("sortOrder");
    // Search query parameter
    const searchQuery = req?.nextUrl?.searchParams.get("search");
    
    let carts = []
    const userId = new Types.ObjectId(params.params.userId)
    if (page) {
      // Using Populate
      // carts = await Carts.find({
      //   ...params.params,
      //   ...(searchQuery && {
      //     $or: [
      //       { 'user.firstname': { $regex: searchQuery } },
      //       { 'price': +searchQuery },
      //     ],
      //   }),
      // }).populate("userId", { email: 1, firstname: 1, lastname: 1, address: 1, _id: 1 }).sort({ [activeSort]: sortOrder === "ASC" ? 1 : -1 }).skip((page - 1) * pageSize).limit(pageSize);

      carts = await Carts.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $match: {
            'user._id': userId,
            ...(searchQuery && {
              $or: [
                { 'user.firstname': { $regex: searchQuery } },
                { 'user.lastname': { $regex: searchQuery } },
                { 'price': +searchQuery },
              ],
            }),
          },
        },
        {
          $sort: { [activeSort]: sortOrder === 'ASC' ? 1 : -1 },
        },
        {
          $skip: (page - 1) * pageSize,
        },
        {
          $limit: pageSize,
        },
      ]);
    }

    const allData = await Carts.find(params.params)

    return NextResponse.json(
      { data: (page ? carts : allData) || [], count: allData.length, message: "Cart fetch Successfully" },
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

    // Calculate the total price based on the products array
    const totalPrice = await Promise.all(reqData.products.map(async product => {
      const productDetails = await Products.findOne({ _id: product.productId });
      return productDetails ? productDetails.salePrice * product.quantity : 0;
    })).then(prices => prices.reduce((total, salePrice) => total + salePrice, 0));

    // Update data in the Carts table based on userId
    const updatedCart = await Carts.findOneAndUpdate(
      { userId: params.params.userId, completed: false },
      { products: reqData.products, price: totalPrice },
      { new: true, upsert: true }
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