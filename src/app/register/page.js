"use client"; // This is a client component 👈🏽
import API, { handleError, handleSuccess } from "@/lib/common";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { Button, Card, CardBody, Form, Col, Row, Label } from "reactstrap";
import InputField from "@/Component/InputField";
import { registrationInputFields } from "@/constants/general";
import Link from "next/link";
import { Store } from "@/redux/configureStore";
import { Actions } from "@/redux/actions";

const Register = () => {
  const router = useRouter();
  // State
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
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
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Required'),
      address: Yup.string(),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      Store.dispatch({ type: Actions.User.SetLoading, payload: true })
      await API('POST', "/api/register", values).then(res => {
        handleSuccess(res)
        Store.dispatch({ type: Actions.User.SetLoading, payload: false })
        router.push("/login");
      }).catch(err => {
        Store.dispatch({ type: Actions.User.SetLoading, payload: false })
        handleError(err)
      });
    },
  });

  return (
    <div className="pre-login-section">
      <div className="pre-login-wrap large">
        <div className="logo-wrap">
          <span>Demo</span>
        </div>
        <Card className="shadow">
          <CardBody>
            <div className="text-center mb-4">
              <h1>Sign Up</h1>
            </div>
            <Form role="form">
              <Row>
                <Col md={6}>
                  <InputField required placeholder="First Name" fieldName="firstname" formik={formik} />
                </Col>
                <Col md={6}>
                  <InputField required placeholder="Last Name" fieldName="lastname" formik={formik} />
                </Col>
              </Row>
              {registrationInputFields.map((row, index) => {
                return <Row key={index}>
                  <Col md={6}>
                    <InputField required={row?.requiredLeft} passwordField placeholder={row.placeholderLeft} fieldName={row.fieldNameLeft} inputType={row?.passwordIconLeft ? showNewPassword ? "text" : "password" : row?.inputTypeLeft} passwordIcon={row?.passwordIconLeft} formik={formik} showPassword={showNewPassword} setShowPassword={setShowNewPassword} />
                  </Col>
                  <Col md={6}>
                    <InputField required={row?.requiredRight} passwordField placeholder={row.placeholderRight} fieldName={row.fieldNameRight} inputType={row?.passwordIconRight ? showConfirmPassword ? "text" : "password" : row?.inputTypeRight} passwordIcon={row?.passwordIconRight} formik={formik} showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} />
                  </Col>
                </Row>
              })}
              <Row>
                <Col>
                  <InputField required placeholder="Address" fieldName="address" formik={formik} />
                </Col>
              </Row>
              <div className="btn-wrap">
                <Button color='primary' disabled={!!Object.values(formik.errors)?.length} type="button" onClick={formik.handleSubmit}>
                  Sign up
                </Button>
              </div>
            </Form>
            <div className="links-wrap">
              <Link className="secondary-link" href="/login">
                Already have an account?
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;
