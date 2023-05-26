import React, { useEffect, useState } from "react";
import { AuthorAPI } from "../../apis/AuthorAPI";
import AlertBtn from "../Alert/AlertBtn";
import { Link, useNavigate } from "react-router-dom";
import { UserAPI } from "../../apis/UserAPI";

const Register = () => {
  const [password, setPassword] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [UserName, setUserName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [StatusVal, setStatusVal] = useState(true);
  const [StatusCode, setStatusCode] = useState();
  const [logo, setLogo] = useState()




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
    return Object.keys(error).length !== 0;
  }

  const nav = useNavigate()

  const handleLogin = () => {
    if(validateForm()) {
      AuthorAPI.Register({
        username: UserName,
        password: password,
        confirmPassword: confirmPassword,
        mobile: mobileNumber,
        userId:UserName
      })
        .then((res) => {
          localStorage.setItem("UserName", res.username);
          localStorage.setItem("UserPassword", res.password)
          nav('/login');
        })
        .catch((error) => {
          setStatusCode(error.response.status);
          setErrorMsg(error.response.data.message);
          setStatusVal(false);
        });
    }
  };

  useEffect(()=>{
   UserAPI.Self_By_App_Url().then((res)=>{
    setLogo(res?.data?.logo)
   }) 
  },[])


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
            src={logo}
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
                to="/"
                className="btn btn-primary btn-block">
                <i className="ml-2 fa fa-sign-in rotateBtn"></i>
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
