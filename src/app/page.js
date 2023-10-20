/* eslint-disable react/no-unescaped-entities */

"use client"; // This is a client component 👈🏽"
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchApi } from "@/lib/common";
import { Button, TextField } from "@mui/material";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const handleLogin = async () => {
    const response = await fetchApi("/api/login", JSON.stringify(loginData));

    if (response.statusCode == 200) {
      console.log(response);
      setCookie('token',response.data.data)
      toast.success(response.data.message)
      router.push("/dashboard");
    }else{
      toast.error(response.data.message)
    }
  };
  
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <ToastContainer />
      <div className="w-[30%] h-[30%]">
        <h1 className="text-center mb-5">Login</h1>
        <TextField
          variant="standard"
          fullWidth
          className="!mb-3"
          placeholder="Username"
          value={loginData.username}
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
        />
        <TextField
          variant="standard"
          fullWidth
          className="!mb-3"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <Button
          className="text-center"
          variant="outlined"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </Button>
        <div className="mt-4 text-center">
          Don't Have an Account?
          <a href="/register">sign up</a>
        </div>
      </div>
    </div>
  );
};
export default Login;
