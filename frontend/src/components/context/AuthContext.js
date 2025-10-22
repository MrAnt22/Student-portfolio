import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AxiosInstance from "../Axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children, navigate }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    authTokens ? jwtDecode(authTokens.access) : null
  );

  useEffect(() => {
    if (!user && authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
  }, []);

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    } else {
      setUser(null);
    }
  }, [authTokens]);

  const loginUser = async (username, password) => {
    try {
      const response = await AxiosInstance.post("api/token/", {
        username,
        password,
      });
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  const registerUser = async (userData) => {
    try {
      await AxiosInstance.post("api/register/", userData);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
  }, [authTokens]);

  const updateUser = async (updatedData) => {
    try {
      const response = await AxiosInstance.patch("api/profile/update/", updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setUser(response.data);
      alert("Update success");
      return response.data;
    } catch (error) {
      console.error("Update error: ", error.response?.data || error);
      alert("Update error.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authTokens,
        loginUser,
        registerUser,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
