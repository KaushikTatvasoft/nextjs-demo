// pages/api/login.js
import dbConnect from "@/lib/dbConnect";
import Users from "../../../Models/users";
import { NextResponse } from "next/server";
import * as Yup from 'yup';

// Exporting the specific HTTP method (post) as a named export
export async function POST(req, res) {
  try {
    await dbConnect();
    const reqData = await req.json();

    // Define validation schema using Yup
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    });

    // Validate the incoming data
    try {
      await schema.validate(reqData, { abortEarly: false });
    } catch (validationError) {
      return NextResponse.json(
        { message: validation.error[0], errors: validationError.errors[0] },
        { status: 400 }
      );
    }

    // Use bcrypt or another secure password hashing library for real-world applications
    const user = await Users.findOne({
      email: reqData.email,
      password: reqData.password,
    });

    if (user) {
      return NextResponse.json(
        { data: user, message: "Login Successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "User Not Found or Invalid Credentials" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
