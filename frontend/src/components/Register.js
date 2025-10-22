import { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";

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
    <div>
      <section className="our-team">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Box>
        <input
          placeholder="Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          placeholder="First Name"
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
        />
        <input
          placeholder="Last Name"
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        </Box>
        <br/>
        <button type="submit" className="btn btn-outline-success">Sign Up</button>
      </form>
      </section>
    </div>
  );
};

export default RegisterPage;
