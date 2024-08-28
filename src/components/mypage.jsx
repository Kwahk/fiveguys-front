import React from 'react';
import { Link } from 'react-router-dom';
import './mypage.css';

function MyPage() {
  return (
    <div className="mypage-container">
      <h1>마이 페이지</h1>
      <p>여기서 사용자 정보를 확인하거나 관리할 수 있습니다.</p>
      <ul className="settings-list">
        <li className="settings-item"><Link to="/profile">프로필 정보</Link></li>
        <li className="settings-item"><Link to="/change-password">비밀번호 변경</Link></li>
      </ul>
    </div>
  );
}

export default MyPage;
