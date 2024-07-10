import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { REGISTER_CYBERBUGS_SAGA } from "../../../redux/constants/Cyberbugs/UserConst";

function RegisterCyberBugs(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  return (
    <form onSubmit={handleSubmit} className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3
          style={{ fontWeight: 300, fontSize: 35 }}
          className="text-center mb-4"
        >
          Sign Up
        </h3>
        <div>
          <Input
            onChange={handleChange}
            name="email"
            style={{ minWidth: "400px" }}
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="text-danger">{errors.email}</div>
        {/* <div className="text-danger ">{errors.email}</div> */}
        <div>
          <Input.Password
            onChange={handleChange}
            name="password"
            style={{ minWidth: "400px" }}
            className="mt-3"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </div>
        <div className="text-danger">{errors.password}</div>
        <div>
          <Input
            onChange={handleChange}
            name="phoneNumber"
            style={{ minWidth: "400px" }}
            className="mt-3"
            size="large"
            placeholder="Phone number"
            prefix={<PhoneOutlined />}
          />
        </div>
        <div className="text-danger">{errors.phoneNumber}</div>
        <div>
          <Input
            onChange={handleChange}
            name="name"
            style={{ minWidth: "400px" }}
            className="mt-3"
            size="large"
            placeholder="Name"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="text-danger">{errors.name}</div>
        <div className="row"></div>
        <div className="d-flex flex-row">
          <Button
            htmlType="submit"
            className="mt-3"
            style={{ backgroundColor: "rgb(102,117,223)", minWidth: 400 }}
            type="primary"
            size="large"
          >
            Sign Up
          </Button>
        </div>
        <div
          className="mt-3 d-flex flex-row text-start"
          style={{ minWidth: "400px", fontSize: "20px" }}
        >
          <p className="me-4">Already have an account?</p>
          <NavLink to={"/login"}>Sign in</NavLink>
        </div>
      </div>
    </form>
  );
}

const userRegisterCyberbugs = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(3, "Password must have min 6 characters")
      .max(20, "Password must have max 12 characters")
      .required("password is required!"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .required("Phone number is required"),
    name: Yup.string().required("Name is required"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
        type: REGISTER_CYBERBUGS_SAGA,
        userRegister: values,
    })
  },
  displayName: "Register CyberBugs",
})(RegisterCyberBugs);

export default connect()(userRegisterCyberbugs);
