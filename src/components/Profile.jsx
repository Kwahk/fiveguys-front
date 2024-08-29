import { useEffect, useState } from "react";
import "./Profile.css";
import Userprofile from "../assets/userprofile.png";
import { jwtDecode } from "jwt-decode"; // 수정된 부분
import axios from "axios";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    birthDate: "",
  });

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

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/api/innout/${userId}/profile`)
        .then((response) => {
          setUserData(response.data); // 서버에서 받은 데이터를 상태로 설정
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  return (
    <div className="profile-container">
      <img src={Userprofile} alt="Userprofile Icon" className="icon" />
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-info">
        <div className="profile-item">
          <span className="profile-label">Name:</span>
          <span className="profile-value">{userData.name}</span> {/* 수정된 부분 */}
        </div>
        <div className="profile-item">
          <span className="profile-label">Gender:</span>
          <span className="profile-value">{userData.gender}</span> {/* 수정된 부분 */}
        </div>
        <div className="profile-item">
          <span className="profile-label">Birth Date:</span>
          <span className="profile-value">{userData.birthDate}</span> {/* 수정된 부분 */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
