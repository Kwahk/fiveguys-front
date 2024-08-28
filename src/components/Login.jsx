import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import axios from "axios"; // axios 추가
import Cookies from "js-cookie"; // js-cookie 라이브러리 추가

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberEmail, setRememberEmail] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

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
      Cookies.set("savedEmail", email, { expires: 7 }); // 7일 동안 이메일 쿠키 저장
    } else {
      Cookies.remove("savedEmail");
    }

    // 로그인 요청 전송
    try {
      const response = await axios.post("http://localhost:8080/api/innout/login", { email, password });
      console.log("Login successful:", response.data);

      // JWT 토큰을 로컬 스토리지에 저장
      const token = response.data; // 서버에서 토큰을 직접 응답받는다고 가정
      localStorage.setItem("jwtToken", token);

      alert("Thanks to join us!!");
      navigate("/calendar"); // 로그인 성공 시 캘린더 페이지로 리디렉션
      window.location.reload(); // 페이지를 새로고침하여 토큰 확인 로직 실행
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
            <div className="password-icon">{/* Add eye icon here */}</div>
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
