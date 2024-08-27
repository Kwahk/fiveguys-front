import { Link } from "react-router-dom";

const Join = () => {
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
          <div className="certify-item">
            <label htmlFor="birth">BIRTH</label>
            <input type="date" id="birth" />
          </div>
          <div className="certify-item">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input type="email" id="email" placeholder="Enter Your Email" />
          </div>
          <div className="certify-item">
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" placeholder="********" />
            <div className="password-icon">{/* Add eye icon here */}</div>
          </div>
          <div className="certify-item">
            <label htmlFor="confirm-password">PASSWORD CONFIRM</label>
            <input type="password" id="confirm-password" placeholder="********" />
            <div className="password-icon">{/* Add eye icon here */}</div>
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
