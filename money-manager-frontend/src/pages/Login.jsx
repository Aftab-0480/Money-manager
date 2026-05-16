import "../pages/Login.css";

export function Login() {
  return (
    <div className="login-container">
      <h1 className="login-title">Login Page</h1>

      <input
        className="login-input"
        type="text"
        placeholder="Username"
      />

      <input
        className="login-input"
        type="password"
        placeholder="Password"
      />

      <button className="login-button">Login</button>
    </div>
  );
}