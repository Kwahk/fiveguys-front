import "./css/HeaderComponent.css";
import MainLogo from "../../assets/Mainlogo.png";
import Dropdown from "../../assets/Dropdown.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const HeaderComponent = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const DropdownHandler = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={MainLogo} alt="Logo" className="logo" />
        </Link>
      </div>
      <nav className="header-bar">
        <ul className="header-list">
          <Link to="/calendar">
            <li className="header-item">Calendar</li>
          </Link>
          <Link to="/dashboard">
            <li className="header-item">Leaderboard</li>
          </Link>
          <Link to="/statistics">
            <li className="header-item">Statistics</li>
          </Link>
          <li className="dropdown-container">
            <img src={Dropdown} alt="Dropdown" className="dropdown-icon" onClick={DropdownHandler} />
            <div className={`dropdown-menu ${isDropdownVisible ? "show" : ""}`}>
              <ul className="menu">
                <Link to="/">
                  <li className="menu-item">Logout</li>
                </Link>
                <li className="menu-line"></li>
                <Link to="/mypage">
                  <li className="menu-item">Mypage</li>
                </Link>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
