"use client"; // This is a client component 👈🏽"
import React from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import API, { fetchApi, handleError, handleSuccess } from "../../lib/common";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import withAuth from "@/lib/withAuth";

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      await API('POST',"/api/login", values).then((res) => {
        setCookie("token", res.data.data.token);
        setCookie("userData", res.data.data.user);
        handleSuccess(res)
        router.push("/dashboard");
      }).catch(err => handleError(err));
    },
  });

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <ToastContainer />
      <div className="w-[30%] h-[30%] flex flex-col justify-center items-center">
        <h1 className="text-center mb-5">Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            variant="standard"
            fullWidth
            className="!mb-3"
            placeholder="Email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={ Boolean(formik.errors.email)}
            helperText={ formik.errors.email}
          />
          <TextField
            variant="standard"
            type="password"
            fullWidth
            className="!mb-3"
            placeholder="Password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={ Boolean(formik.errors.password)}
            helperText={ formik.errors.password}
          />
          <Button
            className="text-center"
            variant="outlined"
            type="submit"
          >
            Login
          </Button>
        </form>
        <div className="mt-4 text-center">
          Don<span>&#39;</span>t Have an Account?
          <span
            className="cursor-pointer"
            onClick={() => router.push("/register")}
          >
            {" "}
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Login);
