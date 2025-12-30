import { React, useState, useContext, useEffect, useForm } from 'react'
import AuthContext from "./context/AuthContext"
import { useNavigate } from 'react-router-dom';
import "../Porfile.css"

const Profile = () =>{
    const { user, updateUser } = useContext(AuthContext);

    const navigate = useNavigate()
    const projectPage = () =>{
      navigate('/project');
    }
    const skillPage =() =>{
      navigate('/skills')
    }
    const summaryPage = () =>{
      navigate('/summary')
    }

    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      group: '',
      year_of_study: '',
      specialization: '',
      github_link: '',
      linkedin_link: '',
      bio: '',
      profile_photo: null,
    });


    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (files) {
        setFormData({ ...formData, [name]: files[0] });
      } else {
        setFormData({ ...formData, [name]: value });
    }
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        const filteredData = Object.fromEntries(
          Object.entries(formData).filter(([_, value]) => value !== '' && value !== null)
        );
        console.log("Submitting:", filteredData);
        await updateUser(filteredData);
     };

    return (
  <>
    <section className="profile-page">
      <div className="container">
        <div className="row">

          <div className="col-lg-4">
            <div className="profile-card shadow-sm">
              <h5 className="text-center mb-3">Моє фото</h5>

              <div className="text-center mb-3">
                <img
                  src={
                    user.profile_photo
                      ? (user.profile_photo.startsWith('http')
                        ? user.profile_photo
                        : `${process.env.REACT_APP_API_URL}${user.profile_photo}`)
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  width="140"
                  height="140"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #f0f0f0",
                  }}
                />
              </div>

              <input
                type="file"
                name="profile_photo"
                accept="image/*"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <button
                type="submit"
                className="btn btn-outline-warning"
                onClick={handleSubmit}
              >
                Зберегти зміни
              </button>

              <button type="submit"
                className="btn btn-outline-dark" onClick={() => navigate(-1)}>Back</button> 
              <hr />

              <div className="text-center">
                <button onClick={projectPage} className="btn btn-info">
                  Мої проекти
                </button>
                <button onClick={skillPage} className="btn btn-secondary">
                  Мої навички
                </button>
                <button onClick={summaryPage} className="btn btn-success">
                  Мій підсумок
                </button>
              </div>
            </div>
          </div>


          <div className="col-lg-8">
            <div className="profile-form shadow-sm">
              <h5 className="text-center mb-4">
                Змінити інформацію для <b>{user.first_name}</b>
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {[
                    ["first_name", "Ім'я"],
                    ["last_name", "Прізвище"],
                    ["email", "Email"],
                    ["group", "Група"],
                    ["year_of_study", "Рік навчання (курс)"],
                    ["github_link", "GitHub профіль"],
                    ["linkedin_link", "LinkedIn профіль"],
                  ].map(([name, label]) => (
                    <div className="col-lg-6 mb-3" key={name}>
                      <input
                        type="text"
                        name={name}
                        placeholder={label}
                        value={formData[name]}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  ))}
                </div>

                <button type="submit" className="btn btn-outline-primary">
                  Зберегти зміни
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="bio-section mt-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="bio-info">
                <h4>Розкажіть про <em>себе</em></h4>
                <p>
                  Опишіть ваш навчальний досвід, досягнення або сильні сторони —
                  те, що буде цікаво майбутньому роботодавцю.
                </p>
                <form onSubmit={handleSubmit}>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="form-control mb-3"
                    rows="6"
                  />
                  <button className="btn btn-outline-dark">
                    Зберегти
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="bio-display shadow-sm">
                <h4>Ваше <b>Біо</b></h4>
                <p
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    color: "#333",
                    fontSize: "16px",
                    lineHeight: "1.6",
                  }}
                >
                  {user.bio || "Біо ще не заповнено."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

};

export default Profile