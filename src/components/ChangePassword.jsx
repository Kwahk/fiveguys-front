import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {REST_API_BASE_URL} from "../services/Service"

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.sub);
      } catch (error) {
        console.error("JWT decoding failed:", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 8) {
      alert("새 비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    try {
      const payload = {
        currentPassword,
        newPassword,
      };

      const response = await axios.put(`${REST_API_BASE_URL}/innout/${userId}/change-password`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다!");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data || "비밀번호 변경 중 오류가 발생했습니다.";
      console.error("Error:", errorMessage);
      alert(errorMessage);
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
