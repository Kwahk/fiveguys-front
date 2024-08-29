import React, { useState } from 'react';
import axios from 'axios'; // axios를 추가하여 백엔드와 통신
import { useNavigate } from 'react-router-dom'; // navigate를 사용하여 페이지 이동

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // 페이지 리디렉션을 위해 useNavigate 사용

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const payload = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      const token = localStorage.getItem("jwtToken"); // 로컬 스토리지에서 JWT 토큰 가져오기
      const response = await axios.post(
        "http://localhost:8080/api/innout/change-password",
        payload, // 요청 본문 데이터
        {
          headers: {
            "Content-Type": "application/json", // JSON 형식 지정
            Authorization: `Bearer ${token}`, // Authorization 헤더에 Bearer 토큰 포함
          },
        }
      );

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다!");
        navigate("/login"); // 비밀번호 변경 후 로그인 페이지로 리디렉션
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      // 오류 응답에 대한 세부 사항을 콘솔에 기록
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        alert("비밀번호 변경 중 오류가 발생했습니다: " + error.response.data);
      } else if (error.request) {
        console.error("서버 응답이 없습니다:", error.request);
        alert("서버 응답이 없습니다. 네트워크 문제일 수 있습니다.");
      } else {
        console.error("요청 설정 중 오류가 발생했습니다:", error.message);
        alert("요청 설정 중 오류가 발생했습니다.");
      }
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
