import { Link } from "react-router-dom";

const PWSearch = () => {
  const handleSearchPassword = (event) => {
    event.preventDefault();

    const tempPassword = Math.random().toString(36).slice(-8);
    alert(`Your temporary password is: ${tempPassword}`);
  };

  return (
    <div className="page-container-search">
      <div className="certify-container">
        <form className="certify-form" onSubmit={handleSearchPassword}>
          <h2 className="form-title">Find Your Password</h2>
          <div className="certify-item">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="certify-item">
            <label htmlFor="username">USERNAME</label>
            <input type="text" id="username" placeholder="Enter Your Username" />
          </div>
          <button type="submit" className="submit-button">
            TEPORARY PASSWARD
          </button>
          <div className="signup-footer">
            <Link to="/login" className="find-link">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PWSearch;
