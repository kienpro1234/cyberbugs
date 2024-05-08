import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleInput = (e) => {
    let { name, value } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userLogin.userName === userLogin.password) {
      localStorage.setItem('userLogin', JSON.stringify(userLogin));
      navigate(-1);

    } else {
      alert("Login failed!");
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3 className="display-4">Login</h3>
        <div className="form-group">
          <p>User Name</p>
          <input
            name="userName"
            className="form-control "
            onChange={handleInput}
          ></input>
        </div>
        <div className="form-group">
          <p>Password</p>
          <input
            name="password"
            className="form-control "
            onChange={handleInput}
          ></input>
        </div>
        <div className="form-group">
          <button className="btn btn-success">Đăng Nhập</button>
        </div>
      </form>
    </div>
  );
}
