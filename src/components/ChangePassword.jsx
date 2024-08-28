import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      alert('비밀번호가 성공적으로 변경되었습니다!');
      // 추가적인 동작이나 리디렉션 처리
    } else {
      alert('새 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="page-container">
      <div className="certify-container">
        <form className="certify-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Reset Password</h2>

          <div className="certify-item">
            <label htmlFor="currentPassword">CURRENT PASSWORD</label>
            <input
              type="password"
              id="currentPassword"
              placeholder="Enter Your Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="certify-item">
            <label htmlFor="newPassword">NEW PASSWORD</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter Your New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="certify-item">
            <label htmlFor="confirmPassword">CONFIRM NEW PASSWORD</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Your New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
          CHANGE PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
