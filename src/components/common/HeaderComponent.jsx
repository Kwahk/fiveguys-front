import "./HeaderComponent.css"; // 별도의 CSS 파일로 스타일을 분리할 경우 사용

const HeaderComponent = () => {
  return (
    <header className="header">
      <div className="title">인-앤-아웃 OOOO</div>
      <nav className="header-bar">
        <ul className="header-list">
          <li className="header-item">Calender</li>
          <li className="header-item">Leaderboard</li>
          <li className="header-item">Statistics</li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
