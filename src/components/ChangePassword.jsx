import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // 리디렉션을 위해 useNavigate 사용

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // JWT 토큰을 헤더에 포함하여 비밀번호 변경 요청 전송
      const token = localStorage.getItem("jwtToken"); // 로컬 스토리지에서 JWT 토큰 가져오기
      const response = await axios.post(
        "http://localhost:8080/api/innout/change-password",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 포함
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
      console.error("비밀번호 변경 중 오류가 발생했습니다:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="page-container">
      <div className="certify-container">
        <form className="certify-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Reset Password</h2>

          <div className="certify-item">
            <label htmlFor="currentPassword">CURRENT PASSWORD</label>
            <input type="password" id="currentPassword" placeholder="Enter Your Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          </div>

          <div className="certify-item">
            <label htmlFor="newPassword">NEW PASSWORD</label>
            <input type="password" id="newPassword" placeholder="Enter Your New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>

          <div className="certify-item">
            <label htmlFor="confirmPassword">CONFIRM NEW PASSWORD</label>
            <input type="password" id="confirmPassword" placeholder="Confirm Your New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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
