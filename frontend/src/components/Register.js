import { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import "../Auth.css";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Створити акаунт</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <input
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            placeholder="Ім'я"
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
          <input
            placeholder="Прізвище"
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
          <input
            type="password"
            placeholder="Пароль"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <button type="submit" className="auth-btn">Реєстрація</button>
        </form>

        <div className="auth-link">
          Вже маєте акаунт? <a href="/login">Увійти</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
