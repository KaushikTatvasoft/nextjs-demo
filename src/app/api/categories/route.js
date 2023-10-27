import authenticate from "@/lib/authMiddleware";
import Categories from '../../../Models/categories'
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { pageSize } from "@/constants/general";

export async function GET(req, res) {
  try {
    await dbConnect();

    const authenticated = await authenticate(req);

    if (typeof authenticated === 'object') {
      return authenticated
    }

    // Pagination parameters
    const page = req?.nextUrl?.searchParams.get("page")
    const skip = (page - 1) * pageSize;

    // Sorting parameters
    const activeSort = req?.nextUrl?.searchParams.get("activeSort");
    const sortOrder = req?.nextUrl?.searchParams.get("sortOrder");

    const categories = await Categories.find().sort({ [activeSort]: sortOrder === "ASC" ? 1 : -1 }).skip(skip)
      .limit(pageSize);

    const allData = await Categories.find()
    return NextResponse.json(
      { data: categories, count: allData.length, message: "Categories fetch Successfully" },
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
