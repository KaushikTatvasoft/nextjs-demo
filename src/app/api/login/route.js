// pages/api/login.js
import dbConnect from "@/lib/dbConnect";
import Users from "../../../Models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as Yup from 'yup';
import { signToken } from "@/helpers/auth";

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
        { message: validationError.error?.length && validationError.error[0], errors: validationError.errors[0] },
        { status: 400 }
      );
    }

    // Use bcrypt or another secure password hashing library for real-world applications
    const user = await Users.findOne({
      email: reqData.email,
    });
    if (!user)
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );

    const passwordMatch = await bcrypt.compare(reqData.password, user.password);
    if (!passwordMatch)
      return NextResponse.json(
        { message: "Password not matched." },
        { status: 401 }
      );

    // token data
    const tokenData = {
      id: user._id,
      firstName: user.firstname,
      lastName: user.lastname
    };

    // generate token
    const token = await signToken(tokenData);
    if (!token)
      return NextResponse.json(
        { message: "Token not created" },
        { status: 404 }
      );

    // login user data
    const userData = {
      user: {
        userId: user._id,
        firstName: user.firstname,
        lastName: user.lastname
      },
      token: token,
    };

    return NextResponse.json(
      { data: userData, message: "Login Successfully" },
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
