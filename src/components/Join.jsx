import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Join = () => {
  const [username, setUsername] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/innout/join", {
        username,
        birthDate: birth, 
        email,
        password,
        passwordConfirm: confirmPassword,
      });

      if (response.status === 200) {
        alert("Signup successful!");
        navigate("/login"); 
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed! Please try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="background-gradient"></div>
      <div className="certify-container">
        <form className="certify-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Sign Up</h2>
          <div className="certify-item">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              placeholder="johndoe@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="certify-item">
            <label htmlFor="birth">BIRTH</label>
            <input
              type="date"
              id="birth"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              required
            />
          </div>
          <div className="certify-item">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              type="email"
              id="email"
              placeholder="rndnjf@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
            />
            <div className="password-icon">{/* Add eye icon here */}</div>
          </div>
          <div className="certify-item">
            <label htmlFor="confirm-password">PASSWORD CONFIRM</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="password-icon">{/* Add eye icon here */}</div>
          </div>
          <button type="submit" className="submit-button">
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

export default Join;
