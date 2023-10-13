// pages/api/login.js
import dbConnect from "@/lib/dbConnect";
import Products from '../../../Models/products'
import { NextResponse } from "next/server";
import * as Yup from 'yup';

export async function GET(req, res) {
  try {
    await dbConnect();

    // Use bcrypt or another secure password hashing library for real-world applications
    const products = await Products.find();

      return NextResponse.json(
        { data: products, message: "Products fetch Successfully" },
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
