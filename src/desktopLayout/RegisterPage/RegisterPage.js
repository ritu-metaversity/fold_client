import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthorAPI } from "../../apis/AuthorAPI";
import { FaHandPointDown } from "react-icons/fa";
import { api } from "../../apis/configs/axiosConfigs";

const RegisterPage = () => {
  const [password, setPassword] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [UserName, setUserName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [StatusVal, setStatusVal] = useState(true);
  const [StatusCode, setStatusCode] = useState();
  const [logo, setLogo] = useState();
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateForm = () => {
    let error = {};

    if (UserName === "") {
      error = "User Name is required";
      setStatusVal(true);
    }

    if (password === "") {
      error = "Password is required";
      setStatusVal(true);
    }
    if (confirmPassword !== password) {
      error = "Password and Password Confirmation should be same";
      setStatusVal(true);
    }

    if (mobileNumber === "") {
      setStatusVal(true);
      error = "Mobile Number is required";
    }

    setErrorMsg(error);
    return Object.keys(error).length === 0;
  };

  const nav = useNavigate();

  const handleLogin = () => {
    if (validateForm()) {
      setIsLoading(true);
      AuthorAPI.Register({
        username: UserName,
        password: password,
        confirmPassword: confirmPassword,
        mobile: mobileNumber,
        userId: UserName,
      })
        .then((res) => {
          localStorage.setItem("UserName", res.username);
          localStorage.setItem("UserPassword", res.password);
          nav("/login");
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setStatusCode(error.response.status);
          setErrorMsg(error.response.data.message);
          setStatusVal(false);
        });
    }
  };



  const handleLoginWithDemoAccount = ()=>{
    setIsLoading1(true);
    AuthorAPI.LOGIN_WITH_DEMO_USER()
      .then((res) => {
        console.log(res.data.token);
        const token = res.data.token;
        setMessage(res.message);
        setIsLoading1(false);
        localStorage.removeItem("UserName");
        localStorage.removeItem("UserPassword");
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res?.data?.token}`;
        setStatusVal(res?.data.status);
        console.log(res?.data?.message)
        setMessage("Invalid Username or password");
        localStorage.setItem("UsertypeInfo", res?.data?.userTypeInfo);
        const uId = res.data?.username;
        localStorage.setItem("UserId", uId);
        if (res.data?.token !== "" && res?.data?.token !== undefined  && res?.data.status !== false) {
        localStorage.setItem("token", token);

          nav("/m/home");
        }
        const pType = res?.data?.passwordtype;
        localStorage.setItem("Password-type", pType);
        if (pType === "old") {
          nav("/m/setting/changepassword");
        }
        if (res?.data.status === false) {
          setStatusVal(false);
          setErrorMsg(res?.data?.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading1(false);
      });
}


  return (
    <>
      <div className="login-wrapper">
        <div className="text-center logo-login mb-3">
          <img src={logo} alt="" />
        </div>
        <div className="login-form">
          <h4 className="text-center register_head">
            REGISTER <FaHandPointDown /> <i className="fas fa-hand-point-down"></i>
          </h4>
          {StatusVal === false ? <p className="error">{errorMsg}</p> : ""}
          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group mb-4">
              <input
                name="User Name"
                type="text"
                placeholder="Username"
                className="form-control form-cont"
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
                className="form-control form-cont"
                aria-required="true"
                aria-invalid="false"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
             
            </div>
            <div className="form-group mb-4">
              <input
                name="Password"
                type="password"
                placeholder="Password"
                className="form-control form-cont"
                aria-required="true"
                aria-invalid="false"
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>
            <div className="form-group mb-4">
              <input
                name="Password"
                type="password"
                placeholder="Confirm Password"
                className="form-control form-cont"
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
                {isLoading ? (
                  <i className="ml-2 fa fa-spinner fa-spin"></i>
                ) : (
                  <i className="ml-2 fa fa-sign-in"></i>
                )}
              </button>
            </div>
            <div className="form-group mb-0 mt-2">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={handleLoginWithDemoAccount}>
                Login with Demo User
                {isLoading1 ? (
                  <i className="ml-2 fa fa-spinner fa-spin"></i>
                ) : (
                  <i className="ml-2 fa fa-sign-in"></i>
                )}
              </button>
            </div>
            <div className="form-group mb-0" style={{ marginTop: "12px" }}>
              <Link type="submit" to="/" className="btn btn-primary btn-block">
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

export default RegisterPage;
