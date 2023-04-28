import React from "react";
import "./Signup6.css";
import { Link } from "react-router-dom";

const Signup6 = () => {
  return (
    <>
      <div class=" main-wrapper">
        <div className="singupdiv">
        <div class="header">GET ₹1K RISK FREE PREDICTION</div>
        <form action="#">
          <div class="field input-field">
            <input type="text" required />
            <label>User Name</label>
          </div>
          <div class="field input-field">
            <input type="text" required />
            <label>Password</label>
          </div>
          <div class="field input-field">
            <input type="text" required />
            <label>Confirm Password</label>
          </div>
          <div class="field input-field">
            <input type="number" required />
            <label>Mobile Number</label>
          </div>
          <div class="field input-field">
            <input type="number" required />
            <label>SMS Verifiction code</label>
          </div>
          <div class="field button-field">
            <button>Sign up</button>
          </div>
          <div class="form-link sign-up">
            <span>Already have an account? </span> <Link href="#">Login Now!</Link>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default Signup6;
