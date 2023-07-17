import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthorAPI } from "../../apis/AuthorAPI";
import { FaHandPointDown } from "react-icons/fa";
import { api } from "../../apis/configs/axiosConfigs";
import { UserAPI } from "../../apis/UserAPI";

const RegisterPage = () => {
  const [password, setPassword] = useState(0);
  const [mobileNumber, setMobileNumber] = useState(0);
  const [UserName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [StatusVal, setStatusVal] = useState(false);
  const [StatusCode, setStatusCode] = useState();
  const [logo, setLogo] = useState();
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isDemoIdLoginAllowed, setIsDemoIdLoginAllowed] = useState();





  const nav = useNavigate();

  const handleValidation = () => {
    if (UserName === "" && mobileNumber === 0 && password === 0) {
      setUserNameError("User Name is required");
      setPasswordError("Password is required.");
      setmobileNumberError("Mobile number must not be empty.");
      return false;
    } else if (UserName === "") {
      setUserNameError("User Name is required");
      return false;
    } else if (password === 0) {
      setPasswordError("Password is required.");
      return false;
    } else if (mobileNumber === 0 || mobileNumber === undefined) {
      setmobileNumberError("Mobile number must not be empty.");
      return false;
    } else if (confirmPassword !== password) {
      return false;
    } else if (mobileNumber?.length !== 10) {
      return false;
    } else if (
      password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$#!%*?&_]{8,12}$/
      ) === null
    ) {
      return false;
    } else if (UserName?.length < 4) {
      return false;
    } else if (UserName?.length > 8) {
      return false;
    } else if (UserName?.match(/^[a-zA-Z0-9]+$/) === null) {
      return false;
    } else if (password?.length < 8) {
      return false;
    } else if (password.length > 12) {
      return false;
    }
    return true;
  };

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [mobileNumberError, setmobileNumberError] = useState("");
  const [userNameError, setUserNameError] = useState("");

    const handlePassWordsValidation = (e) => {
    setPassword(e.target.value);
    const passData = e.target.value;
    if (passData === "") {
      setPasswordError("Password is required.");
    } else if (passData?.length < 8) {
      setPasswordError("Minimum 8 letters required.");
    } else if (passData?.length > 13) {
      setPasswordError("Maximum 12 letters required");
    } else if (
      passData?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$#!%*?&_]{8,12}$/) ===
      null
    ) {
      setPasswordError(
        "Password should contain atleast one number and one lower case and one upper case."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordsValidation = (e) => {
    setConfirmPassword(e.target.value);
    const confirmPass = e.target.value;
    if (password !== confirmPass) {
      setConfirmPasswordError("Password must be equal.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleMobileNumber = (e) => {
    setMobileNumber(e.target.value);
    if (e.target.value === "") {
      setmobileNumberError("Mobile number must not be empty.");
    } else if (e.target.value?.length !== 10) {
      setmobileNumberError("Mobile number must be 10 digit number");
    } else {
      setmobileNumberError("");
    }
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
    const userData = e.target.value;
    if (userData === "") {
      setUserNameError("User Name is required");
    } else if (userData?.length < 4) {
      setUserNameError("Minimum 4 letters required.");
    } else if (userData?.length > 8) {
      setUserNameError("Maximum 8 letters required.");
    } else if (userData?.match(/^[a-zA-Z0-9]+$/) === null) {
      setUserNameError("Only number and alphabet are allowed.");
    } else {
      setUserNameError("");
    }

    
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setStatusVal(false);
    if (handleValidation()) {
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
          setStatusVal(true);
          // setStatusCode(error.response.status);
          setErrorMsg(error.response.data.message);
        });
    }
  };
  const handleLoginWithDemoAccount = ()=>{
    setIsLoading1(true);
    AuthorAPI.LOGIN_WITH_DEMO_USER()
      .then((res) => {
        const token = res.data.token;
        setMessage(res.message);
        setIsLoading1(false);
        localStorage.removeItem("UserName");
        localStorage.removeItem("UserPassword");
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res?.data?.token}`;
        setStatusVal(res?.data.status);
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
          setStatusCode(error.response.status);
          setErrorMsg(error.response.data.message);
          setStatusVal(false);
        setIsLoading1(false);
      });
}


useEffect(()=>{
  UserAPI.Self_By_App_Url().then((res)=>{
    setIsDemoIdLoginAllowed(res?.data?.isDemoIdLoginAllowed);
      setLogo(res?.data?.logo);
  })
},[])

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
          {StatusVal === true ? <p className="error">{errorMsg}</p> : ""}
          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group mb-4">
              <input
                name="User Name"
                type="text"
                placeholder="Username"
                className="form-control form-cont"
                aria-required="true"
                aria-invalid="false"
                onChange={handleUserName}
                onFocus={handleUserName}
              />
             <p
                style={{ marginTop: "12px", fontSize: "12px", marginLeft:"3px" }}
                className="text-danger error-msg">
                {userNameError}
              </p>
            </div>
            <div className="form-group mb-4">
              <input
                name="Mobile Number"
                type="Number"
                placeholder="Mobile Number"
                className="form-control form-cont"
                aria-required="true"
                aria-invalid="false"
               onChange={handleMobileNumber}
                onFocus={handleMobileNumber}
              />
             <p
                style={{ marginTop: "12px", fontSize: "12px" , marginLeft:"3px"}}
                className="text-danger error-msg">
                {mobileNumberError}
              </p>
            </div>
            <div className="form-group mb-4">
              <input
                name="Password"
                type="password"
                placeholder="Password"
                className="form-control form-cont"
                aria-required="true"
                aria-invalid="false"
                onChange={handlePassWordsValidation}
                onFocus={handlePassWordsValidation}
              />
                <p
                style={{ marginTop: "12px", fontSize: "12px" , marginLeft:"3px"}}
                className="text-danger error-msg">
                {passwordError}
              </p>
            </div>
            <div className="form-group mb-4">
              <input
                name="Password"
                type="password"
                placeholder="Confirm Password"
                className="form-control form-cont"
                aria-required="true"
                aria-invalid="false"
                onChange={handleConfirmPasswordsValidation}
                onFocus={handleConfirmPasswordsValidation}
              />
              <p
                style={{ marginTop: "12px", marginLeft:"3px",fontSize: "12px" }}
                className="text-danger error-msg">
                {confirmPasswordError}
              </p>
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
            {
              isDemoIdLoginAllowed? <div className="form-group mb-0 mt-2">
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
            </div>:""
            }
           
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
