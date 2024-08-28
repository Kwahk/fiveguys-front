import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // axios를 사용하여 백엔드와 통신

const PWSearch = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchPassword = async (event) => {
    event.preventDefault();

    try {
      // 백엔드에 이메일과 유저네임을 확인하는 요청을 보냄
      const response = await axios.post("http://localhost:8080/api/innout/password-reset", {
        email: email,
        username: username,
      });

      if (response.status === 200) {
        const tempPassword = response.data; // 백엔드에서 임시 비밀번호를 받음
        alert(`Your temporary password is: ${tempPassword}`);
      } else {
        setErrorMessage("Email or Username does not match.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="page-container">
      <div className="certify-container">
        <form className="certify-form" onSubmit={handleSearchPassword}>
          <h2 className="form-title">Find Your Password</h2>
          
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          
          <div className="certify-item">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="certify-item">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="submit-button">
            TEMPORARY PASSWORD
          </button>
          <div className="signup-footer">
            <Link to="/login" className="find-link">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PWSearch;
