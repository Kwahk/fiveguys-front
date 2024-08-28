import React from "react";
import { Link } from "react-router-dom";
import profileIcon from "../assets/profile.png";
import passwordIcon from "../assets/password.png";
import logoutIcon from "../assets/logout.png";
import "./mypage.css";

function MyPage() {
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
          <Link to="/">
            <img src={logoutIcon} alt="logout Icon" className="icon" />
            log out
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MyPage;
