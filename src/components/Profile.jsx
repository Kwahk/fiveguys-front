import React from 'react';
import './Profile.css';
import Userprofile from "../assets/userprofile.png";

const Profile = ({ name, email, birthDate }) => {
  return (
    <div className="profile-container">
      <img src={Userprofile} alt="Userprofile Icon" className="icon" />
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-info">
        <div className="profile-item">
          <span className="profile-label">Name:</span>
          <span className="profile-value">{name}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Email:</span>
          <span className="profile-value">{email}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Birth Date:</span>
          <span className="profile-value">{birthDate}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
