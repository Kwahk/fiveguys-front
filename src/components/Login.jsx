import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [rememberEmail, setRememberEmail] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); 

  useEffect(() => {
    const savedEmail = Cookies.get("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rememberEmail) {
      Cookies.set("savedEmail", email, { expires: 7 }); 
    } else {
      Cookies.remove("savedEmail");
    }

    try {
      const response = await axios.post("http://localhost:8080/api/innout/login", { email, password });

      if (response.status === 200) {
        navigate("/calendar"); 
      }
    } catch (error) {
      setErrorMessage("Login failed: Incorrect email or password.");
    }
  };

  return (
    <div className="page-container">
      <div className="background-gradient"></div>
      <div className="certify-container">
        <form className="certify-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Log in&out</h2>
          
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="certify-item">
            <label htmlFor="email">ID (email)</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="certify-item">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <div className="password-icon">{/* Add eye icon here */}</div>
          </div>

          <button type="submit" className="submit-button">
            LOGIN
          </button>
          <div className="options-container">
            <span className="login-sub">
              <input
                type="checkbox"
                id="checkId"
                name="checkId"
                checked={rememberEmail}
                onChange={(e) => setRememberEmail(e.target.checked)} 
              />
              <label htmlFor="checkId" className="checkbox-label">
                아이디 저장
              </label>
            </span>
            <div className="find-options">
              <Link to="/pwsearch" className="find-link">
                비밀번호 찾기
              </Link>
            </div>
          </div>
        </form>
        <div className="login-footer">
          Not a Member? <Link to="/join">SIGN UP NOW</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;