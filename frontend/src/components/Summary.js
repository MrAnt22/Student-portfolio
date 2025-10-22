import { React, useState, useContext, useEffect} from 'react'
import AxiosInstance from "./Axios"
import AuthContext from "./context/AuthContext"

const Summary = () =>{
    const { user, updateUser } = useContext(AuthContext);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            const response = await AxiosInstance.get("api/summary/");
            updateUser(response.data.user || response.data);
            setSkills(response.data.skills || []);  
        } catch (error) {
            console.error("Помилка при отриманні профілю:", error);
        }
        };
        fetchProfile();
    }, []);

    if (!user) {
        return <p style={{ textAlign: "center", marginTop: "100px" }}>Завантаження...</p>;
    }

  return(
        <>
        <br/><br/><br/><br/><br/><br/>
       <div className="w3-content w3-margin-top">

        <div className="w3-row-padding">

            <div className="w3-third">
            
            <div className="w3-white w3-text-grey w3-card-4">
                <div className="w3-display-container">
                {user.profile_photo && (
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src={user.profile_photo.startsWith('http') ? user.profile_photo : `${process.env.REACT_APP_API_URL}${user.profile_photo}`}
                        alt="Profile"
                        width="100%"
                        style={{ }}
                      />
                    </div>
                  )}
                <div className="w3-display-bottomleft w3-container w3-text-black">
                    <h2>{user.first_name} {user.last_name}</h2>
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
        

    )
}

export default Summary