import "../pages/Signup.css";

export function Signup() {
  return (
    <div className="signup-container">
      <h1 className="signup-title">Signup Page</h1>

      <input
        className="signup-input"
        type="text"
        placeholder="Enter Your Name"
      />

      <input
        className="signup-input"
        type="text"
        placeholder="Enter Username"
      />

      <input
        className="signup-input"
        type="email"
        placeholder="Enter Your Email"
      />

      <input
        className="signup-input"
        type="password"
        placeholder="Enter Password"
      />

      <button className="signup-button">Signup</button>
    </div>
  );
}