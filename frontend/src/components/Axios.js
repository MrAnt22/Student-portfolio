import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL = "http://127.0.0.1:8000/";

const AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use(async (req) => {
  const tokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  if (tokens) {
    const accessToken = tokens.access;
    const refreshToken = tokens.refresh;
    const decoded = jwtDecode(accessToken);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      try {
        const response = await axios.post(`${baseURL}api/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        req.headers.Authorization = `Bearer ${response.data.access}`;
      } catch (error) {
        console.error("Refresh token expired — logging out...");
        localStorage.removeItem("authTokens");
        window.location.href = "/login";
      }
    } else {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return req;
});

export default AxiosInstance;