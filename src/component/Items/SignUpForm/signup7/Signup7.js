import React from "react";
import "./Signup7.css";

const Signup7 = () => {
  return (
    <div className="signup-container">
      <div class="main-sinnup-2">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div class="signup">
          <form>
            <label for="chk" aria-hidden="true">
              Sign up
            </label>
            <input type="text" className="signup-input" name="txt" placeholder="User name" required="" />
            <input type="password" className="signup-input" name="email" placeholder="Password" required="" />
            <input
              type="password"
              name="pswd"
              placeholder="Confirm Password"
              required=""
              className="signup-input"
            />
            <input type="number" className="signup-input" name="mobile number" placeholder="Mobile Number" required="" />
            <input type="number" className="signup-input" name="Sms" placeholder="SMS Verification Code" required="" />
            <button>Sign up</button>
          </form>
        </div>

        <div class="loginData">
          <form>
            <label for="chk" className="loginData" aria-hidden="true">
              Login
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup7;
