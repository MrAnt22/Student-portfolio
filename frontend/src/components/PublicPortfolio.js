import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "./Axios";

const PublicPortfolio = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get(`api/public/${username}/`);
        console.log("Отримані дані:", res.data);
        setData(res.data);
      } catch (error) {
        console.error("Помилка при отриманні портфоліо:", error);
      }
    };
    fetchData();
  }, [username]);

  if (!data) return <p style={{ textAlign: "center", marginTop: "50px" }}>Завантаження...</p>;

  const { user, skills } = data;

  return (
    <>
        <br/><br/><br/><br/><br/><br/>
       <div className="w3-content w3-margin-top">

        <div className="w3-row-padding">    

            <div className="w3-third">
            
            <div className="w3-white w3-text-grey w3-card-4">
                <div className="w3-display-container">
                    <div style={{ marginTop: "10px" }}>
                <div className="w3-display-bottomleft w3-container w3-text-black">
                    <h2>{user.first_name} {user.last_name}</h2>
                </div>
                </div>
                </div>
                <div className="w3-container">
                <p><i className="fa fa-calendar-minus-o  fa-fw w3-margin-right w3-large w3-text-teal"></i>Курс: {user.year_of_study}</p>
                <p><i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>{user.email}</p>
                
                <hr/>

                <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Навички</b></p>
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <div key={skill.id} style={{ marginBottom: "10px" }}>
                      <p>{skill.name}</p>
                      <div className="w3-light-grey w3-round-xlarge w3-small">
                        <div
                          className="w3-container w3-center w3-round-xlarge w3-teal"
                          style={{ width: `${skill.level*20}%` }}
                        >
                          {skill.level}%
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Навички ще не додані</p>
                )}
                  
                <br/>
                </div>
            </div><br/>

            </div>

            <div className="w3-twothird">
            
            <div className="w3-container w3-card w3-white w3-margin-bottom">
                <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Про себе</h2>
                <div className="w3-container">
                <p style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    color: "#333",
                    fontSize: "16px",
                    lineHeight: "1.6",
                  }}>{user.bio}</p>
                <hr/>
                </div>
            </div>

            <div className="w3-container w3-card w3-white">
                <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i></h2>
                <div className="w3-container">
                <h5 className="w3-opacity"><b>GitHub</b></h5>
                <p>{user.github_link}</p>
                <hr/>
                </div>
                <div className="w3-container">
                <h5 className="w3-opacity"><b>LinkedIn</b></h5>
                <p>{user.linkedin_link}</p>
                <hr/>
                </div>
            </div>
            </div>

        </div>

        </div>
        </>
  );
};

export default PublicPortfolio;
