import { React, useState, useContext, useEffect} from 'react'
import AxiosInstance from "./Axios"
import AuthContext from "./context/AuthContext"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../Summary.css"

const Summary = () =>{
    const { user, updateUser } = useContext(AuthContext);
    const [skills, setSkills] = useState([]);
    const [topRepos, setTopRepos] = useState([]);

    useEffect(() => {
      const fetchProfile = async () => {
        try {
            const response = await AxiosInstance.get("api/summary/");
            
            updateUser(response.data.user || response.data);

            setSkills(response.data.skills || []);
            setTopRepos(response.data.top_repos || []);

        } catch (error) {
            console.error("Помилка при отриманні профілю:", error);
        }
      };
      fetchProfile();
    }, []);

    const downloadPDF = async () => {
      const element = document.getElementById("portfolio-content");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("portfolio.pdf");
    };

    if (!user) {
        return <p style={{ textAlign: "center", marginTop: "100px" }}>Завантаження...</p>;
    }

    const handleShareProfile = () => {
        const profileUrl = `${window.location.origin}/u/${user.username}`;

        if (navigator.share) {
            navigator.share({
                title: "Поділитися профілем",
                text: "Мій профіль:",
                url: profileUrl
            });
        } else {
            navigator.clipboard.writeText(profileUrl)
                .then(() => alert("Посилання скопійовано!"));
        }
    };

  return(
        <>
        <br/><br/><br/><br/><br/>

        <div className="portfolio-wrapper">
            <button className="btn btn-success" onClick={downloadPDF}>
              Завантажити PDF
            </button>

            {" "}

            <button className="btn btn-success" onClick={handleShareProfile}>
              Поділитися
            </button>

            <div id="portfolio-content">

              <div className="w3-content w3-margin-top">

                  <div className="w3-row-padding">

                      <div className="w3-third">
                      
                      <div className="w3-white w3-text-grey w3-card-4">

                          <div className="w3-display-container">
                            {user.profile_photo && (
                                <img
                                  src={user.profile_photo.startsWith('http') ? user.profile_photo : `${process.env.REACT_APP_API_URL}${user.profile_photo}`}
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
                            <p><i className="fa fa-calendar-minus-o fa-fw w3-margin-right w3-large w3-text-teal"></i>Курс: {user.year_of_study}</p>
                            <p><i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>{user.email}</p>
                            <p><i className="fa fa-linkedin fa-fw w3-margin-right w3-large w3-text-teal"></i>{user.linkedin_link}</p>
                            <hr/>

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
                              <i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Про себе
                            </h2>

                            <div className="w3-container">
                              <p className="bio-text">{user.bio}</p>
                              <hr/>
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
        </div>

        </>
    )
}

export default Summary
