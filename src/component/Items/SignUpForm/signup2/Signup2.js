import React, { useState } from "react";
import "./Signup2.css";
import * as yup from "yup";

const Signup2 = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [CpasswordShow, setCPasswordShow] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    mobile: "",
    sms: "",
  });
  const [disabled, setDisabled] = useState(true)

  const handlePasswordShow = () => {
    if (passwordShow === true) {
      setPasswordShow(false);
    } else {
      setPasswordShow(true);
    }
  };
  const handleConfirmPassword = () => {
    if (CpasswordShow === true) {
      setCPasswordShow(false);
    } else {
      setCPasswordShow(true);
    }
  };



  const handleInput = (e) => {
    
    const input = e.target;
    const key = input.name;
    const value = input.value;

    return setInput((oldData) => {
      return {
        ...oldData,
        [key]: value,
      };
    });
  };

  let schema = yup.object().shape({
    username: yup.string().required("Email is Required").email(),
    password: yup.string().required("Password is required").min(4).max(10),
    sms: yup.number().required().integer
  });

const validation = async()=>{
    const isValid = await schema.isValid(input);
}


  return (
    <>
      <div className="backgroundImg2">
        <div className="">
          <div className="row px-lg-0 px-sm-5">
            {/* <div className="col-md-12 col-lg-6">
              <div className="videoholder">
                <!-- video here -->
                </div>
            </div> */}
            <div className="">
              <div className="formholder">
                <h4 className="heading">5X Bonus  Up to ₹25000</h4>

                <form id="form" className="mainform">
                  <div className="username">
                    <input
                      type="text"
                      name="username"
                      autoComplete="off"
                      placeholder="Username"
                      id="username"
                      value={input.username}
                      onChange={handleInput}
                      onKeyDown={validation}
                    />
                  </div>
                  <div className="password">
                    <input
                      type={passwordShow ? "text" : "password"}
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={input.password}
                      onChange={handleInput}
                      onKeyDown={validation}
                    />
                    <p className="eye">
                      <i
                        className="fa fa-eye-slash"
                        onClick={handlePasswordShow}></i>
                    </p>
                  </div>
                  <div className="password">
                    <input
                      type={CpasswordShow ? "text" : "password"}
                      name="confirmpass"
                      id="confirmpassword"
                      placeholder="Confirm Password"
                      value={input.confirmpass}
                      onChange={handleInput}
                      onKeyDown={validation}
                    />
                    <p className="eye">
                      <i
                        className="fa fa-eye-slash"
                        onClick={handleConfirmPassword}></i>
                    </p>
                  </div>
                  <div className="mobilecode">
                    <input
                      type="tel"
                      autocomplete="off"
                      name="mobile"
                      placeholder="Mobile"
                      id="mobile"
                      value={input.mobile}
                      onChange={handleInput}
                      onKeyDown={validation}
                    />
                  </div>
                  <div className="signupbuttonholder">
                    <button disabled={disabled} className="custom-btn btn-7" id="_signup">
                      <span>Sign Up</span>
                    </button>
                  </div>

                  <div className="alreadyaccount">
                    Already have an account?
                    <a className="signin" href="javascript:void(0)">
                      Sign in
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup2;
