"use client"; // This is a client component 👈🏽
import { fetchApi } from "@/lib/common";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      firstname: '',
      lastname: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      firstname: Yup.string().required('Required'),
      lastname: Yup.string().required('Required'),
      address: Yup.string(),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      // Your form submission logic here
      const response = await fetchApi("/api/register", JSON.stringify(values));
      if (response.statusCode === 200) {
        toast.success(response.data.message);
        router.push("/login");
      } else {
        toast.error(response.data.message);
      }
    },
  });

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <ToastContainer />
      <div className="w-[30%] h-[30%] flex flex-col justify-center items-center">
        <h1 className="text-center mb-5">Register</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex space-x-2 mb-2">
            <TextField
              variant="standard"
              fullWidth
              placeholder="Firstname"
              id="firstname"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={ Boolean(formik.errors.firstname)}
              helperText={ formik.errors.firstname}
            />
            <TextField
              variant="standard"
              fullWidth
              placeholder="Lastname"
              id="lastname"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={ Boolean(formik.errors.lastname)}
              helperText={ formik.errors.lastname}
            />
          </div>
          <TextField
            variant="standard"
            fullWidth
            placeholder="Email"
            id="email"
            name="email"
            className="mt-3"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={ Boolean(formik.errors.email)}
            helperText={ formik.errors.email}
          />
          <TextField
            variant="standard"
            fullWidth
            placeholder="Address"
            id="address"
            name="address"
            className="mt-3"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={ Boolean(formik.errors.address)}
            helperText={ formik.errors.address}
          />
          <TextField
            variant="standard"
            fullWidth
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            className="mt-3"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={ Boolean(formik.errors.password)}
            helperText={ formik.errors.password}
          />
          <TextField
            variant="standard"
            fullWidth
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            className="mt-3"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={ Boolean(formik.errors.confirmPassword)}
            helperText={ formik.errors.confirmPassword}
          />
          <Button
            className="text-center mt-4"
            variant="outlined"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center">
          Already Have an Account?
          <span className="cursor-pointer" onClick={() => router.push("/login")}>
            {" "}
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
