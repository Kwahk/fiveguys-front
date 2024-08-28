import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberEmail, setRememberEmail] = useState(false);
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
      const responseData = response.data;

      if (responseData.includes(":change-password")) {
        alert("Please set a new password.");
        navigate("/change-password");
      } else {
        localStorage.setItem("jwtToken", responseData);
        alert("Enjoy our page!!");
        navigate("/calendar");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="page-container">
      <div className="background-gradient"></div>
      <div className="certify-container">
        <form className="certify-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Log in&out</h2>
        
          <div className="certify-item">
            <label htmlFor="email">ID (email)</label>
            <input type="text" id="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="certify-item">
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="submit-button">
            LOGIN
          </button>
          <div className="options-container">
            <span className="login-sub">
              <input type="checkbox" id="checkId" name="checkId" checked={rememberEmail} onChange={(e) => setRememberEmail(e.target.checked)} />
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
