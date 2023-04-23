import React, { useState } from "react";
import { AuthorAPI } from "../../apis/AuthorAPI";
import RegisterModals from "./RegisterModals";
import Modal from "react-bootstrap/Modal";
import AlertBtn from "../Alert/AlertBtn";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [password, setPassword] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [UserName, setUserName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showModals, setShowModals] = useState(false);
  const [userId, setUserId] = useState();
  const [userPassword, setUserPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [StatusVal, setStatusVal] = useState(true);
  const [StatusCode, setStatusCode] = useState();
  // const [timeOut, setTimeOut] = useState(null);

  const handleCloseModal = () => setShowModals(false);



  const validateForm =()=>{
    let error = {};

    if(UserName === ""){
      error= "User Name is required"
      setStatusVal(true)
    }
    
    if(password === ""){
      error = "Password is required"
      setStatusVal(true)
    }
    if(confirmPassword !== password){
      error = 'Password and Password Confirmation should be same'
      setStatusVal(true)
    }

    if(mobileNumber === ""){
      setStatusVal(true)
      error = "Mobile Number is required"
    }
    

    setErrorMsg(error);
    return Object.keys(error).length === 0;
  }

  const nav = useNavigate()

  const handleLogin = () => {
    if(validateForm()) {
      AuthorAPI.Register({
        username: UserName,
        password: password,
        confirmPassword: confirmPassword,
        mobile: mobileNumber,
      })
        .then((res) => {
          localStorage.setItem("UserName", res.username);
          localStorage.setItem("UserPassword", res.password)
          nav('/');
        })
        .catch((error) => {
          setStatusCode(error.response.status);
          setErrorMsg(error.response.data.message);
          setStatusVal(false);
        });
    }
  };


  const popupClose=(vl)=>{
    setStatusVal(vl)
  }
  return (
    <>
      <div className="login-wrapper">
        {!StatusVal? (
          <div className="alertBtn">
            <AlertBtn val={errorMsg}  
            popupClose={popupClose}
            />
          </div>
        ) : (
          ""
        )}
        <div className="text-center logo-login mb-3">
          <img
            src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/themes/diamondexch9.com/mobile/logo.png"
            alt=""
          />
        </div>
        <div className="login-form">
          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group mb-4">
              <input
                name="User Name"
                type="text"
                placeholder="Username"
                className="form-control"
                aria-required="true"
                aria-invalid="false"
                onChange={(e) => setUserName(e.target.value)}
              />
              <span
                className="text-danger error-msg"
                style={{ display: "none" }}>
                {" "}
              </span>
            </div>
            <div className="form-group mb-4">
              <input
                name="User Name"
                type="Number"
                placeholder="Mobile Number"
                className="form-control"
                aria-required="true"
                aria-invalid="false"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <span
                className="text-danger error-msg"
                style={{ display: "none" }}></span>
            </div>
            <div className="form-group mb-4">
              <input
                name="Password"
                type="password"
                placeholder="Password"
                className="form-control"
                aria-required="true"
                aria-invalid="false"
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="text-danger error-msg"
                style={{ display: "none" }}></span>
            </div>
            <div className="form-group mb-4">
              <input
                name="Password"
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                aria-required="true"
                aria-invalid="false"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="text-danger error-msg"
                style={{ display: "none" }}></span>
            </div>
            <div className="form-group mb-0">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={handleLogin}>
                Register
                <i className="ml-2 fa fa-sign-in"></i>
              </button>
            </div>
            <div className="form-group mb-0" style={{ marginTop: "12px" }}>
              <Link
                type="submit"
                to="/login"
                className="btn btn-primary btn-block">
                <i className="ml-2 fa fa-sign-in rotateBtn"></i>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
