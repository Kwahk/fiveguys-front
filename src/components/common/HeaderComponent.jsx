import "./css/HeaderComponent.css";
import MainLogo from "../../assets/Mainlogo.png";
import Dropdown from "../../assets/Dropdown.png";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
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
          <li className="header-item">
            <img src={Dropdown} alt="Dropdown" className="dropdown" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
