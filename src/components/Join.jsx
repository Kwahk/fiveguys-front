import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import axios from "axios";
import { REST_API_BASE_URL } from '/src/services/Service.js';

const Join = () => {
  const [formData, setFormData] = useState({
    username: "",
    birthDate: "",
    gender: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      gender: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${REST_API_BASE_URL}/innout/join`, formData);
      console.log("Success:", response.data);
      alert("Thanks to join us!!");
      navigate("/login"); // 성공 시 로그인 페이지로 리디렉션
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="background-gradient"></div>
      <div className="certify-container">
        <form className="certify-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Sign Up</h2>
          <div className="certify-item">
            <label htmlFor="username">USERNAME</label>
            <input type="text" id="username" placeholder="Enter Your Name" onChange={handleInputChange} />
          </div>
          <div className="certify-item-double" style={{ display: "flex" }}>
            <span>
              <label htmlFor="birth">BIRTH</label>
              <input type="date" id="birthDate" onChange={handleInputChange} />
            </span>
            <span>
              <label>GENDER</label>
              <div>
                <input type="radio" id="male" name="gender" value="남성" checked={formData.gender === "남성"} onChange={handleGenderChange} />
                <label htmlFor="남성">Male</label>
                <input type="radio" id="female" name="gender" value="여성" checked={formData.gender === "여성"} onChange={handleGenderChange} />
                <label htmlFor="여성">Female</label>
              </div>
            </span>
          </div>
          <div className="certify-item">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input type="email" id="email" placeholder="Enter Your Email" onChange={handleInputChange} />
          </div>
          <div className="certify-item">
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" placeholder="********" onChange={handleInputChange} />
          </div>
          <div className="certify-item">
            <label htmlFor="confirm-password">PASSWORD CONFIRM</label>
            <input type="password" id="passwordConfirm" placeholder="********" onChange={handleInputChange} />
          </div>
          <button type="submit" className="submit-button">
            PROCEED
          </button>
        </form>
        <div className="signup-footer">
          Already a Member? <Link to="/login">LOG IN NOW</Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
