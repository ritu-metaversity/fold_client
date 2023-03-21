import React, { useState } from "react";
import NavBar from "../../navBar/NavBar";
import "../AaccountStatement/AaccountStatement.css";
import AlertBtn from "../../Alert/AlertBtn";
import {AuthorAPI} from '../../../apis/AuthorAPI'


function ChangePassword() {
  const[currPassword, setCurrPassword]= useState("");
  const[newPasswords, setNewpasswords] = useState("");
  const[conformPassword, setConformPassword] = useState("");
  const[ShowError, setShowError] = useState(false);
  const[status, setStatus] = useState("");
  const [message, setMessege] = useState('')
  const [color, setColor] = useState('');
  const [timeOut, setTimeOut] = useState(null)


  const passType =  localStorage.getItem("Password-type");
  const userId = localStorage.getItem("UserId");
  const Token = localStorage.getItem("token");

  const handleClick = ()=>{

    
    if(currPassword===""){
    setShowError(true)
    setColor("danger")
    setMessege("Current Password is required")
    }else if(newPasswords===""){
      setShowError(true)
      setColor("danger")
      setMessege("New Password is required")
    }else if(conformPassword===""|| newPasswords !== currPassword){
      setShowError(true)
      setColor("danger")
      setMessege("New Password and Password Confirmation should be")
    }
    if(passType==="old"){
      AuthorAPI.FIRST_LOGIN({
        currentPassword: currPassword,
        newPassword : newPasswords,
        confirmPassword: conformPassword,
        userid: userId,
        token: Token,
        oldPassword:currPassword
      }).then((res)=>{
        // setMessege(res.data.message)
        setColor("success");
        setMessege("Password Updated");
        setShowError(true)
       
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      AuthorAPI.Change_Passwords({
        currentPassword: currPassword,
        newPassword : newPasswords
      }).then((res)=>{
        setShowError(true);
        setColor("success");
        setMessege("Password Updated");
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
  setTimeout(() => {
    setTimeOut(1)
  }, 15000)
  return (
    <div>
        
      <NavBar />
        {
         ShowError?timeOut !== 1 && <AlertBtn status={status} color={color} className="change-passwords" val={message}/>:""
        }
        <div className="report-container wrapper">
        
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Change Password</h4>
          </div>
          <div className="card-body container-fluid container-fluid-5">
            <div className="row row5 mt-2">
              <div className="col-12">
                <div className="form-group">
                  <label>Current Password</label>{" "}
                  <input type="password" className="form-control"  style={{borderBottom: "1px solid #2c3d50"}} onChange={(e)=>setCurrPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>New Password</label>{" "}
                  <input type="password" className="form-control"  style={{borderBottom: "1px solid #2c3d50"}} onChange={(e)=>setNewpasswords(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>{" "}
                  <input type="password" className="form-control" style={{borderBottom: "1px solid #2c3d50"}} onChange={(e)=>setConformPassword(e.target.value)} />
                  
                </div>
              </div>
            </div>
            <div className="row row5 mt-2">
              <div className="col-12">
                <button className="btn btn-primary btn-block btn-sm" onClick={handleClick}>
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
