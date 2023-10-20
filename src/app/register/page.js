"use client"; // This is a client component 👈🏽
import { fetchApi } from "@/lib/common";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = (props) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const handleRegister = async () => {
    const response = await fetchApi("/api/register", JSON.stringify(userData));
    console.log(response);
    if (response.statusCode == 200) {
      toast.success(response.data.message)
      router.push("/login");
    }else{
      toast.error(response.data.message)
    }
  };

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <ToastContainer />
      <div className="w-[30%] h-[30%] flex flex-col justify-center items-center">
        <h1 className="text-center mb-5">Register</h1>
        <TextField
          variant="standard"
          fullWidth
          className="!mb-3"
          placeholder="Username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <TextField
          variant="standard"
          fullWidth
          type="password"
          className="!mb-3"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <Button
          className="text-center"
          variant="outlined"
          onClick={() => {
            handleRegister();
          }}
        >
          Sign Up
        </Button>
        <div className="mt-4 text-center">
          Already Have an Account?
          <span className="cursor-pointer" onClick={()=> router.push("/login")}> Sign In</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
