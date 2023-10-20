"use client"; // This is a client component 👈🏽"
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Card, CardBody, Form } from "reactstrap";
import InputField from "@/Component/InputField";
import Link from "next/link";
import { Store } from "@/redux/configureStore";
import { Actions } from "@/redux/actions";
import API, { handleError, handleSuccess } from "../../lib/common";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
      Store.dispatch({ type: Actions.User.SetLoading, payload: true })
      await API('POST', "/api/login", values).then((res) => {
        setCookie("token", res.data.data.token);
        setCookie("userData", JSON.stringify(res.data.data.user));
        handleSuccess(res)
        Store.dispatch({ type: Actions.User.SetLoading, payload: false })
        window.location.href = '/dashboard'
      }).catch(err => {
        Store.dispatch({ type: Actions.User.SetLoading, payload: false })
        handleError(err)
      });
    },
  });

  const handleSubmitOnEnter = (e) => {
    if (e.key === 'Enter') {
      formik.handleSubmit()
    }
  }

  return (
    <div className="pre-login-section">
      <div className="pre-login-wrap">
        <div className="logo-wrap">
          <span>Demo</span>
        </div>
        <Card className="shadow">
          <CardBody>
            <div className="text-center mb-4">
              <h1>Log In</h1>
            </div>
            <Form role="form">
              <InputField placeholder="Email" fieldName="email" formik={formik} onKeyPress={handleSubmitOnEnter} />
              <InputField passwordField placeholder="Password" fieldName="password" onKeyPress={handleSubmitOnEnter} formik={formik} inputType={showPassword ? "text" : "password"} passwordIcon showPassword={showPassword} setShowPassword={setShowPassword} />
              <div className="btn-wrap">
                <Button color='primary' disabled={!!Object.values(formik.errors)?.length} type="button" onClick={formik.handleSubmit} >
                  Log in
                </Button>
              </div>
            </Form>
            <div className="links-wrap">
              <Link href="/register" className="secondary-link">
                Create new account
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login
