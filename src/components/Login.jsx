import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="page-container">
      <div className="background-gradient"></div>
      <div className="certify-container">
        <form className="certify-form">
          <h2 className="form-title">Log in&out</h2>
          <div className="certify-item">
            <label htmlFor="username">ID (email)</label>
            <input type="text" id="username" placeholder="johndoe@example.com" />
          </div>
          <div className="certify-item">
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" placeholder="********" />
            <div className="password-icon">{/* Add eye icon here */}</div>
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
          <div className="options-container">
            <span className="login-sub">
              <input type="checkbox" id="checkId" name="checkId" />
              <label htmlFor="checkId" className="checkbox-label">
                아이디 저장
              </label>
            </span>
            <div className="find-options">
              <Link to="/idsearch" className="find-link">
                아이디 찾기
              </Link>
              <Link to="/pwsearch" className="find-link">
                비밀번호 찾기
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
