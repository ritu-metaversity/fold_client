import React, { useEffect, useState } from "react";
import { AuthorAPI } from "../../apis/AuthorAPI";
import AlertBtn from "../Alert/AlertBtn";
import { Link, useNavigate } from "react-router-dom";
import { UserAPI } from "../../apis/UserAPI";
import { api } from "../../apis/configs/axiosConfigs";

const Register = () => {
  const [password, setPassword] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [UserName, setUserName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [StatusVal, setStatusVal] = useState(true);
  const [StatusCode, setStatusCode] = useState();
  const [logo, setLogo] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [alertBtnColor, setAlertBtnColor] = useState()

  const nav = useNavigate()

  const handleLogin = () => {

    if(UserName === ""){
      setAlertBtnColor("danger")
      setErrorMsg("Username is required")
      setStatusVal(false)
    }else if(password === ""){
      setAlertBtnColor("danger")
      setErrorMsg("Password is required")
      setStatusVal(false)
    }else if(mobileNumber === "" || mobileNumber === undefined){
      setAlertBtnColor("danger")
      setErrorMsg("Mobile Number is required")
      setStatusVal(false)
    }else if(confirmPassword !== password){
      setAlertBtnColor("danger")
      setErrorMsg("Password and Password Confirmation should be same")
      setStatusVal(false)
    }else{
      setStatusVal(true)
    }

    console.log(mobileNumber, "defsfs")

    if(confirmPassword === password && mobileNumber !== "") {
      setIsLoading(true)
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
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          setStatusCode(error.response.status);
          setErrorMsg(error.response.data.message);
          setStatusVal(false);
          setAlertBtnColor("danger")
        });
    }
  };


  const handleLoginDemo = ()=>{
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
          setAlertBtnColor("danger")
        }
      })
      .catch((error) => {
        setIsLoading1(false);
      });
  }

  const [statusBtn, setStatusBtn] = useState(false)

  useEffect(()=>{
   UserAPI.Self_By_App_Url().then((res)=>{
    setLogo(res?.data?.logo);
    setStatusBtn(res?.data?.selfAllowed)

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
            color={alertBtnColor}
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
                {isLoading ? (
                    <i className="ml-2 fa fa-spinner fa-spin"></i>
                  ) : (
                    <i className="ml-2 fa fa-sign-in"></i>
                  )}
              </button>
            </div>
            <div className="form-group mb-0">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={handleLoginDemo}>
                  Login with Demo User
                {isLoading ? (
                    <i className="ml-2 fa fa-spinner fa-spin"></i>
                  ) : (
                    <i className="ml-2 fa fa-sign-in"></i>
                  )}
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
