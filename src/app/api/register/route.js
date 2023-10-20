// pages/api/register.js
import { hashPassword } from '@/helpers/auth';
import dbConnect from '../../../lib/dbConnect';
import Users from '../../../Models/users';
import { NextRequest, NextResponse } from 'next/server';
import * as Yup from 'yup';

export async function POST(req, res) {
  try {
    await dbConnect();
    const reqData = await req.json()

    // Define validation schema using Yup
    const schema = Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      firstname: Yup.string().required('Firstname is required'),
      lastname: Yup.string().required('Lastname is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Required'),
      address: Yup.string(),
    });

    // Validate the incoming data
    try {
      await schema.validate(reqData, { abortEarly: false });
    } catch (validationError) {
      return NextResponse.json({ message: validationError.errors[0], errors: validationError.errors[0] }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await Users.findOne({ "email": reqData.email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 404 });
    }

    const hashedPassword = await hashPassword(reqData.password);

        // Create a new user
    const newUser = await Users.create({
      email: reqData.email,
      password: hashedPassword,
      firstname: reqData.firstname,
      lastname: reqData.lastname,
      address: reqData.address,
      phone: reqData.phone,
    });

    return NextResponse.json({ message: 'Registration successful', user: newUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export default POST;
