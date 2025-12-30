import { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import "../Auth.css";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Увійти</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-btn">
            Увійти
          </button>
        </form>

        <div className="auth-link">
          Немає акаунта? <a href="/register">Зареєструватися</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
