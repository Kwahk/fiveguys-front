import "./css/HeaderComponent.css";
import MainLogo from "../../assets/Mainlogo.png";
import Dropdown from "../../assets/Dropdown.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const HeaderComponent = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
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
          <li className="header-item dropdown-container">
            {/* Toggle dropdown visibility on click */}
            <img src={Dropdown} alt="Dropdown" className="dropdown-icon" onClick={toggleDropdown} />
            {/* Dropdown Menu */}
            {isDropdownVisible && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/">Logout</Link>
                </li>
                <li>
                  <Link to="/mypage">MyPage</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
