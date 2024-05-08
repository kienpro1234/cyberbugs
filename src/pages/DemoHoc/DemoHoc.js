import React from "react";
import { useDispatch } from "react-redux";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SlideDown from "../../HOC/Modal/SlideDown";

export default function DemoHoc() {
  const LoginWithSlideDown = function(){return new SlideDown(Login)}
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch({
            type: "LOGIN_FORM",
            Component: <Login />,  
          });
        }}
        type="button"
        class="btn btn-success me-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Đăng nhập
      </button>

      <button
        onClick={() => {
          dispatch({
            type: "REGISTER_FORM",
            Component: <Register />
          });
        }}
        type="button"
        class="btn btn-success "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Đăng kí
      </button>
      <LoginWithSlideDown/>
    </div>
  );
}
