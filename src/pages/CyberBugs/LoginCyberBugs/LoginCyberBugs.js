import React, { useEffect } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { singinCyberbugsAction } from "../../../redux/actions/CyberbugsAction";


function LoginCyberBugs(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
  console.log(errors)
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
          Login CyberBugs
        </h3>
        <div>
          <Input
            onChange={handleChange}
            name="email"
            style={{ minWidth: "400px" }}
            size="large"
            placeholder="Account"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="text-danger ">{errors.email}</div>
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
        <Button
          htmlType="submit"
          className="mt-3"
          style={{ backgroundColor: "rgb(102,117,223)", minWidth: 400 }}
          type="primary"
          size="large"
        >
          Login
        </Button>
        <div className="mt-3">
          <Button
            style={{ backgroundColor: "rgb(59,89,142)" }}
            className="me-3"
            type="primary"
            size="large"
            shape="circle"
          >
            <i class="fab fa-facebook-f"></i>
          </Button>
          <Button type="primary" size="large" shape="circle">
            <i class="fab fa-twitter"></i>
          </Button>
        </div>
      </div>
    </form>
  );
}

const userLoginFormWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(3, "Password must have min 6 characters")
      .max(20, "Password must have max 12 characters"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(singinCyberbugsAction(values));
  },
  displayName: "Login CyberBugs",
})(LoginCyberBugs);

export default connect()(userLoginFormWithFormik);
