import React, { useState } from "react";
import { AuthorAPI } from "../../apis/AuthorAPI";
import RegisterModals from "./RegisterModals";
import Modal from "react-bootstrap/Modal";
import AlertBtn from "../Alert/AlertBtn";
import { Link, useHistory } from "react-router-dom";



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
  const [timeOut, setTimeOut] = useState(null);

//   const history = useHistory();



  const handleCloseModal = () => setShowModals(false);

  const handleLogin = () => {

    AuthorAPI.Register({
      username: UserName,
      password: password,
      confirmPassword: confirmPassword,
      mobile: mobileNumber,
    }).then((res) => {
      setUserId(res.username);
    //   setShowModals(false)
      setUserPassword(res.password);
    //   if (res.token !=="") {
    //     history.push("/login");
    //   }
    //   const pType = res.passwordtype;
    //   localStorage.setItem("Password-type", pType)
    //   if (pType === "old") {
    //     history.push("/m/setting/changepassword");
    //   }
    }).catch((error)=>{
        setStatusCode(error.response.status)
        setErrorMsg(error.response.data.message)
        setStatusVal(false)
    });
    setShowModals(true);
  };

  setTimeout(() => {
    setTimeOut(1);
  }, 15000);

  return (
    <>
      <div className="login-wrapper">
      {StatusVal===false ? timeOut !== 1 && (
          <div className="alertBtn">
            <AlertBtn val={errorMsg} />
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
                <i className="ml-2 fas fa-sign-in-alt"></i>
              </button>
            </div>
            <div className="form-group mb-0">
              <Link
                type="submit"
                to='/login'
                className="btn btn-primary btn-block"
                >
                <i className="ml-2 fas fa-sign-in-alt rotateBtn"></i>
                Login
              </Link>
            </div>
          </form>
          {
            StatusCode===400?"":<Modal
            show={showModals}
            className={``}
            onHide={handleCloseModal}
            style={{
              marginTop: "12px",
              marginInline: "2%",
              width: "95%",
            }}>
            <Modal.Header closeButton closeVariant="white">
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RegisterModals userId={userId} password={userPassword} />
            </Modal.Body>
          </Modal>
          }
            
        </div>
      </div>
    </>
  );
};

export default Register;
