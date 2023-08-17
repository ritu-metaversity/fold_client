import React, { useState } from "react";
import "../AaccountStatement/AaccountStatement.css";
import AlertBtn from "../../Alert/AlertBtn";
import { AuthorAPI } from "../../../apis/AuthorAPI";
import { useNavigate } from "react-router-dom";

function ChangePassword(props) {
  const [currPassword, setCurrPassword] = useState("");
  const [newPasswords, setNewpasswords] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [ShowError, setShowError] = useState(false);
  const [message, setMessege] = useState("");
  const [color, setColor] = useState("");
  const passType = localStorage.getItem("Password-type");
  const userId = localStorage.getItem("UserId");
  const Token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();

  const handleChangeValidation = () => {
    setIsLoading(false);
    if (currPassword === "" && newPasswords === "") {
      setPasswordError("New Password is required.");
      setCurrpasswordError("Current Password is required.");
    } else if (currPassword === "") {
      setCurrpasswordError("Current Password is required.");
      setIsLoading(false);
      return false;
    } else if (newPasswords === "") {
      setPasswordError("New Password is required.");
      setIsLoading(false);
      return false;
    } else if (conformPassword === "") {
      setIsLoading(false);
      return false;
    } else if (newPasswords !== conformPassword) {
      setIsLoading(false);
      return false;
    } else if (
      newPasswords.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$#!%*?&_]{8,12}$/
      ) === null
    ) {
      setIsLoading(false);
      return false;
    } else if (newPasswords?.length < 8) {
      setIsLoading(false);
      return false;
    } else if (newPasswords?.length > 13) {
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const [passwordError, setPasswordError] = useState("");
  const [ConpasswordError, setConPasswordError] = useState("");
  const [CurrpasswordError, setCurrpasswordError] = useState("");

  const handleNewPassword = (e) => {
    setNewpasswords(e.target.value);
    const newPass = e.target.value;
    if (newPass === "") {
      setPasswordError("New Password is required.");
    } else if (newPass?.length < 8) {
      setPasswordError("Minimum 8 letters required.");
    } else if (newPass?.length > 13) {
      setPasswordError("Maximum 12 letters required");
    } else if (
      newPass?.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$#!%*?&_]{8,12}$/
      ) === null
    ) {
      setPasswordError(
        "Password should contain atleast one number and one lower case and one upper case."
      );
    } else {
      setPasswordError("");
    }
    if (newPass !== conformPassword) {
      setConPasswordError("Password must be equal.");
    } else {
      setConPasswordError("");
    }
  };

  const handleConformPassword = (e) => {
    setConformPassword(e.target.value);
    if (newPasswords !== e.target.value) {
      setConPasswordError("Password must be equal.");
    } else {
      setConPasswordError("");
    }
  };

  const handleCurrentPassword = (e) => {
    setCurrPassword(e.target.value);
    if (e.target.value === "") {
      setCurrpasswordError("Current password is required.");
    } else {
      setCurrpasswordError("");
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    if (handleChangeValidation()) {
      if (localStorage.getItem("Password-type") === "old") {
        AuthorAPI.FIRST_LOGIN({
          currentPassword: currPassword,
          newPassword: newPasswords,
          confirmPassword: conformPassword,
          userid: userId,
          token: Token,
          oldPassword: currPassword,
        })
          .then((res) => {
            props.statusMsg(res.status);
            if (res.status === true) {
              setMessege(res.message);
              setTimeout(function () {
                setIsLoading(false);
                AuthorAPI.LOGOUT();
                localStorage.clear();
                nav("/m/login");
              }, 100);
            } else {
              setMessege(res.message);
              setIsLoading(false);
              setShowError(true);
              setColor("danger");
            }
          })
          .catch((error) => {
            setIsLoading(false);
            setMessege(error?.response?.data?.message);
            setShowError(true);
            setColor("danger");
          });
      } else {
        if (conformPassword !== "") {
          AuthorAPI.Change_Passwords({
            currentPassword: currPassword,
            newPassword: newPasswords,
          })
            .then((res) => {
              props.statusMsg(res.status);
              if (res.status === true) {
                setMessege(res.message);
                setTimeout(function () {
                  setIsLoading(false);
                  localStorage.clear();
                  AuthorAPI.LOGOUT();
                  nav("/m/login");
                }, 100);
              } else {
                setMessege(res.message);
                setIsLoading(false);
                setShowError(true);
                setColor("danger");
              }
            })
            .catch((error) => {
              setIsLoading(false);
              setMessege(error?.response?.data?.message);
              setShowError(true);
              setColor("danger");
            });
        }
        // }
      }
    }
  };

  props.message(message);

  const popupClose = (vl) => {
    setShowError(vl);
  };

  return (
    <div>
      {ShowError !== false ? (
        <AlertBtn
          color={color}
          className="change-passwords"
          popupClose={popupClose}
          val={message}
        />
      ) : (
        ""
      )}
      <div className="report-container wrapper">
        <div className="card">
          <div className="card-header" style={{ padding: "4px 5px" }}>
            <h4 className="mb-0 heading-ch">Change Password</h4>
          </div>
          {isLoading && (
            <p className="change-pass-loading">
              <i className="fa fa-spinner fa-spin"></i>
            </p>
          )}
          <div className="card-body container-fluid container-fluid-5 max_height">
            <div className="row row5 mt-2 acc-stat">
              <div className="col-12 ch-pass">
                <div className="form-group">
                  <label>Current Password</label>{" "}
                  <input
                    type="password"
                    className="form-control chbtn"
                    style={{ borderBottom: "1px solid #2c3d50" }}
                    onChange={handleCurrentPassword}
                    onFocus={handleCurrentPassword}
                    // onChange={(e) => setCurrPassword(e.target.value)}
                  />
                  <p
                    style={{ marginTop: "12px", fontSize: "12px" }}
                    className="text-danger error-msg">
                    {CurrpasswordError}
                  </p>
                </div>
                <div className="form-group">
                  <label>New Password</label>{" "}
                  <input
                    type="password"
                    className="form-control chbtn"
                    style={{ borderBottom: "1px solid #2c3d50" }}
                    onChange={handleNewPassword}
                    onFocus={handleNewPassword}
                    // onChange={(e) => setNewpasswords(e.target.value)}
                  />
                  <p
                    style={{ marginTop: "12px", fontSize: "12px" }}
                    className="text-danger error-msg">
                    {passwordError}
                  </p>
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>{" "}
                  <input
                    type="password"
                    className="form-control chbtn"
                    style={{ borderBottom: "1px solid #2c3d50" }}
                    onChange={handleConformPassword}
                    onFocus={handleConformPassword}
                    // onChange={(e) => setConformPassword(e.target.value)}
                  />
                  <p
                    style={{ marginTop: "12px", fontSize: "12px" }}
                    className="text-danger error-msg">
                    {ConpasswordError}
                  </p>
                </div>
              </div>
            </div>
            <div className="row row5 mt-2 acc-stat">
              <div className="col-12">
                <button
                  className="btn btn-primary btn-block btn-sm"
                  onClick={handleClick}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
