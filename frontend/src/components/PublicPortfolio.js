import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "./Axios";

const PublicPortfolio = () => {
  const { username } = useParams();

  const [data, setData] = useState(null);
  const [topRepos, setTopRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get(`api/public/${username}/`);

        console.log("Отримані дані:", res.data);

        setData(res.data);

        setTopRepos(res.data.top_repos || []);
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
      <br /><br /><br /><br /><br /><br />

      <div id="portfolio-content">
        <div className="w3-content w3-margin-top">
          <div className="w3-row-padding">

            <div className="w3-third">
              <div className="w3-white w3-text-grey w3-card-4">

                <div className="w3-display-container">
                  {user.profile_photo && (
                    <img
                      src={`http://127.0.0.1:8000${user.profile_photo}`}
                      alt="Profile"
                      width="100%"
                    />
                  )}
                  <div className="w3-display-bottomleft w3-container w3-text-white">
                    <h2>{user.first_name} {user.last_name}</h2>
                  </div>
                </div>

                <div className="w3-container">
                  <br />
                  <p><i className="fa fa-calendar fa-fw w3-margin-right w3-text-teal"></i>Курс: {user.year_of_study}</p>
                  <p><i className="fa fa-envelope fa-fw w3-margin-right w3-text-teal"></i>{user.email}</p>
                  <p><i className="fa fa-linkedin fa-fw w3-margin-right w3-text-teal"></i>{user.linkedin_link}</p>
                  <hr />

                  <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Навички</b></p>

                  {skills.map((skill) => (
                    <div key={skill.id} style={{ marginBottom: "10px" }}>
                      <p>{skill.name}</p>
                      <div className="w3-light-grey w3-round-xlarge w3-small">
                        <div
                          className="w3-container w3-center w3-round-xlarge w3-teal"
                          style={{ width: `${skill.level * 20}%` }}
                        >
                          {skill.level}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            <div className="w3-twothird">

              <div className="w3-container w3-card w3-white w3-margin-bottom">
                <h2 className="w3-text-grey w3-padding-16">
                  <i className="fa fa-user fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Про себе
                </h2>
                <div className="w3-container">
                  <p className="bio-text">{user.bio}</p>
                  <hr />
                </div>
              </div>

              <div className="w3-container w3-card w3-white w3-margin-bottom">
                <h2 className="w3-text-grey w3-padding-16">
                  <i className="fa fa-github fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>
                  Топ репозиторії
                </h2>

                {topRepos.length === 0 && <p>Немає доступних репозиторіїв</p>}

                {topRepos.map((repo) => (
                  <div key={repo.name} className="repo-item">
                    <h4><b>{repo.name}</b></h4>
                    <p>Stars: {repo.stars} • {repo.language || "N/A"}</p>
                    <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.html_url}</a>
                    <hr />
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default PublicPortfolio;
