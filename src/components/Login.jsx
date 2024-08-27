import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // js-cookie 라이브러리 추가

const Login = () => {
  const [email, setEmail] = useState(""); // 이메일 상태 추가
  const [password, setPassword] = useState(""); // 패스워드 상태 추가
  const [rememberEmail, setRememberEmail] = useState(false); // 이메일 저장 체크박스 상태 추가

  // 페이지 로드 시 쿠키에서 이메일을 불러옴
  useEffect(() => {
    const savedEmail = Cookies.get("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  // 로그인 폼 제출 시 실행
  const handleSubmit = (e) => {
    e.preventDefault();
    // 이메일 저장 여부 확인 후 쿠키에 저장 또는 삭제
    if (rememberEmail) {
      Cookies.set("savedEmail", email, { expires: 7 }); // 7일 동안 이메일 쿠키 저장
    } else {
      Cookies.remove("savedEmail");
    }
    // 여기에 실제 로그인 로직을 추가하세요.
  };

  return (
    <div className="page-container">
      <div className="background-gradient"></div>
      <div className="certify-container">
        <form className="certify-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Log in&out</h2>
          <div className="certify-item">
            <label htmlFor="username">ID (email)</label>
            <input
              type="text"
              id="username"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 이메일 상태 업데이트
            />
          </div>
          <div className="certify-item">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 패스워드 상태 업데이트
            />
            <div className="password-icon">{/* Add eye icon here */}</div>
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
          <div className="options-container">
            <span className="login-sub">
              <input
                type="checkbox"
                id="checkId"
                name="checkId"
                checked={rememberEmail}
                onChange={(e) => setRememberEmail(e.target.checked)} // 체크박스 상태 업데이트
              />
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
