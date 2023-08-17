import React, { useState } from "react";
import SideBar from "../sidebar/SideBar";
import "./ChangePasswordForDesk.css";
import { AuthorAPI } from "../../apis/AuthorAPI";
import { useNavigate } from "react-router-dom";
import AlertBtn from "../../component/Alert/AlertBtn";

const ChangePasswordForDesk = (props) => {
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
    if(currPassword === "" && newPasswords === ""){
      setPasswordError("New Password is required.");
      setCurrpasswordError("Current Password is required.");
      return false
    }
    else if (currPassword === "") {
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
    }else if (newPasswords.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$#!%*?&_]{8,12}$/) === null){
      setIsLoading(false);
      return false;
    }else if (newPasswords?.length < 8){
      setIsLoading(false);
      return false;
    }else if (newPasswords?.length > 13){
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
      newPass?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$#!%*?&_]{8,12}$/) ===
      null
    ) {setPasswordError("Password should contain atleast one number and one lower case and one upper case.");
    } else {
      setPasswordError("");
    }
    if(newPass !== conformPassword){
      setConPasswordError("Password must be equal.")
    }else{
      setConPasswordError("")
    }
  };

  const handleConformPassword = (e)=>{
    setConformPassword(e.target.value);
    if(newPasswords !== e.target.value){
      setConPasswordError("Password must be equal.")
    }else{
      setConPasswordError("")
    }
  }

  const handleCurrentPassword = (e)=>{
    setCurrPassword(e.target.value);
    if(e.target.value === ""){
      setCurrpasswordError("Current password is required.");
    }else{
      setCurrpasswordError("")
    }
  }

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
                nav("/login");
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
        if (newPasswords === conformPassword) {
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
                  nav("/login");
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
    <>
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

      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="itemHome">
            <div className="card">
              <div className="card-header header-card">
                <h4 className="mb-0">Change Password</h4>
              </div>
              <div className="card-body container-fluid container-fluid-5">
                {isLoading ? (
                  <p className="lodder lodder-chng">
                    <i className="fa fa-spinner fa-spin"></i>
                  </p>
                ) : (
                  ""
                )}
                <div className="row row5 mt-2 acc-stat">
                  <div className="col-12 ch-pass">
                    <div className="form-group">
                      <label className="changLable">Current Password</label>{" "}
                      <input
                        type="password"
                        className="form-control pass-control"
                        style={{ borderBottom: "1px solid #2c3d50" }}
                        onChange={handleCurrentPassword}
                        onFocus={handleCurrentPassword}
                      />
                       <p
                        style={{ marginTop: "12px", fontSize: "12px" }}
                        className="text-danger error-msg">
                        {CurrpasswordError}
                      </p>
                    </div>
                    <div className="form-group">
                      <label className="changLable">New Password</label>{" "}
                      <input
                        type="password"
                        className="form-control pass-control"
                        style={{ borderBottom: "1px solid #2c3d50" }}
                        onChange={handleNewPassword}
                        onFocus={handleNewPassword}
                      />
                      <p
                        style={{ marginTop: "12px", fontSize: "12px" }}
                        className="text-danger error-msg">
                        {passwordError}
                      </p>
                    </div>
                    <div className="form-group">
                      <label className="changLable">Confirm New Password</label>{" "}
                      <input
                        type="password"
                        className="form-control pass-control"
                        style={{ borderBottom: "1px solid #2c3d50" }}
                        onChange={handleConformPassword}
                        onFocus={handleConformPassword}
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
                  <div className="col-2">
                    <button
                      className="btn btn-primary btn-block btn-sm changeBtn"
                      onClick={handleClick}>
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordForDesk;
