import { React, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from "./context/AuthContext"
import Button from '@mui/material/Button';

const Home = () =>{
    const { user, logoutUser } = useContext(AuthContext);

    const navigate = useNavigate()
    const profilePage = () =>{
      navigate('/profile');
    }

    return(
        <>
    <section className="main-banner" id="top">
     <div className="container">
          <div className="header-text">
            Кафедра ІПЗЕ
            <h2>Портфоліо студента кафедри<br></br><em>ІПЗЕ</em></h2>
            <div className="main-button-gradient">
              <button className="btn btn-info" onClick={profilePage}>Переглянути профіль</button>
            <div className="main-button-gradient">
          </div>
                <button
                  onClick={logoutUser}
                  className="btn btn-danger mt-3"
                  style={{ borderRadius: "8px" }}
                >
                  Вийти
                </button>
            </div>
      </div>
     </div>
    </section>
        </>
  );
};

export default Home