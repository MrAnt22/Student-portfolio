import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import "../Home.css"

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const profilePage = () => {
    navigate("/profile");
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <span className="faculty-label">Кафедра ІПЗЕ</span>

          <h1 className="hero-title">
            Портфоліо студента кафедри <br />
            <em>ІПЗЕ</em>
          </h1>

          <div className="button-group">
            <button className="btn-soft" onClick={profilePage}>
              Переглянути профіль
            </button>

            <button className="btn-danger-soft" onClick={logoutUser}>
              Вийти
            </button>
          </div>
        </div>

        <div className="hero-decoration-left"></div>
        <div className="hero-decoration-right"></div>
      </section>
    </>
  );
};

export default Home;
