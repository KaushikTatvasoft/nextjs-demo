import authenticate from "@/lib/authMiddleware";
import Categories from '../../../Models/categories'
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
      await dbConnect();
  
      const authenticated = await authenticate(req);
  
      if (typeof authenticated === 'object') {
        return authenticated
      }
  
      const categories = await Categories.find();
      return NextResponse.json(
        { data: categories, message: "Categories fetch Successfully" },
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
  