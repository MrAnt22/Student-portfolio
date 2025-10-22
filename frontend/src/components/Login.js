import { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import Box from "@mui/material/Box";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password);
  };

  return (
    <div>
      <section class="our-team">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/><br/>
        <button type="submit" className="btn btn-outline-success">Login</button>
      </form>
      </section>
    </div>
  );
};

export default LoginPage;
