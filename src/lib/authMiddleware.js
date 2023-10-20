// authMiddleware.js
import { decodeToken } from "@/helpers/auth";
import { NextResponse } from "next/server";
import Users from "../Models/users";

const authenticate = async (req) => {
  try {
    if (!req.headers.get('authorization')) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    const authHeader = req.headers.get('authorization');
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    if (!token) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 419 }
      );
    }

    const tokenData = decodeToken(token);
    if (!tokenData) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await Users.findOne({
      _id: tokenData.id,
    });

    // Check if the user should have admin privileges
    if (!user) {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 401 }
      );
    }

    return true; // Authentication successful
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export default authenticate;
