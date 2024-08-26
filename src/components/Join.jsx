const Join = () => {
  return (
    <div className="join-container">
      <form className="join-form">
        <h2>Sign up</h2>
        <div className="join-item">
          <label htmlFor="username">USERNAME</label>
          <input type="text" id="username" placeholder="atww9dnjf" />
        </div>
        <div className="join-item">
          <label htmlFor="birth">BIRTH</label>
          <input type="text" id="birth" placeholder="2001.01.12" />
        </div>
        <div className="join-item">
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input type="email" id="email" placeholder="rndnjf@example.com" />
        </div>
        <div className="join-item">
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" placeholder="********" />
        </div>
        <div className="join-item">
          <label htmlFor="confirm-password">PASSWORD CONFIRM</label>
          <input type="password" id="confirm-password" placeholder="********" />
        </div>
        <button type="submit" className="signup-button">
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default Join;
