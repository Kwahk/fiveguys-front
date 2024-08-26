import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="page-container">
      <div className="background-gradient"></div>
      <div className="certify-container">
        <form className="certify-form">
          <h2 className="form-title">Log in&out</h2>
          <div className="certify-item">
            <label htmlFor="username">ID(email)</label>
            <input type="text" id="username" placeholder="johndoe@example.com" />
          </div>
          <div className="certify-item">
            <label htmlFor="birth">BIRTH</label>
            <input type="date" id="birth" />
          </div>
          <div className="certify-item">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input type="email" id="email" placeholder="rndnjf@example.com" />
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
          <button type="submit" className="signup-button">
            PROCEED
          </button>
        </form>
        <div className="signup-footer">
          Already a Member? <Link to="/login">LOG IN NOW</Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
