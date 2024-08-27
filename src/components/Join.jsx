import { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [gender, setGender] = useState("");

  return (
    <div className="page-container">
      <div className="background-gradient"></div>
      <div className="certify-container">
        <form className="certify-form">
          <h2 className="form-title">Sign Up</h2>
          <div className="certify-item">
            <label htmlFor="username">USERNAME</label>
            <input type="text" id="username" placeholder="Enter Your Name" />
          </div>
          <div className="certify-item-double" style={{ display: "flex" }}>
            <span>
              <label htmlFor="birth">BIRTH</label>
              <input type="date" id="birth" />
            </span>
            <span>
              <label>GENDER</label>
              <div>
                <input type="radio" id="male" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} />
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} />
                <label htmlFor="female">Female</label>
              </div>
            </span>
          </div>
          <div className="certify-item">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input type="email" id="email" placeholder="Enter Your Email" />
          </div>
          <div className="certify-item">
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" placeholder="********" />
          </div>
          <div className="certify-item">
            <label htmlFor="confirm-password">PASSWORD CONFIRM</label>
            <input type="password" id="confirm-password" placeholder="********" />
          </div>
          <button type="submit" className="submit-button">
            PROCEED
          </button>
        </form>
        <div className="signup-footer">
          Already a Member? <Link to="/login">LOG IN NOW</Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
