import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../assets/profile.png";
import passwordIcon from "../assets/password.png";
import logoutIcon from "../assets/logout.png";
import "./mypage.css";

function MyPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("jwtToken");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="mypage-container">
      <h1>Mypage</h1>
      <p>Here you can view or manage your user information.</p>
      <ul className="settings-list">
        <li className="settings-item">
          <Link to="/profile">
            <img src={profileIcon} alt="Profile Icon" className="icon" />
            profile
          </Link>
        </li>
        <li className="settings-item">
          <Link to="/change-password">
            <img src={passwordIcon} alt="Password Icon" className="icon" />
            change password
          </Link>
        </li>
        <li className="settings-item">
          <div onClick={handleLogout} className="logout-button">
            <img src={logoutIcon} alt="Logout Icon" className="icon" />
            log out
          </div>
        </li>
      </ul>
    </div>
  );
}

export default MyPage;
