import React, { useState, useEffect } from "react";
import AxiosInstance from "./Axios";

const Skills = () =>{
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState({ name: "", level: 2 });

    useEffect(() => {
        const fetchSkills = async () => {
        try {
            const response = await AxiosInstance.get("api/skills/");
            setSkills(response.data);
        } catch (error) {
            console.error("Помилка при завантаженні навичок:", error);
        }
        };
        fetchSkills();
    }, []);

    const handleAddSkill = async () => {
        if (!newSkill.name.trim()) return;
        try {
        const response = await AxiosInstance.post("api/skills/", newSkill);
        setSkills([...skills, response.data]);
        setNewSkill({ name: "", level: 2 });
        } catch (error) {
        console.error("Помилка при додаванні:", error);
        }
    };

    const categorize = (skills) => ({
        veryGood: skills.filter((s) => s.level === 5),
        medium: skills.filter((s) => s.level === 4),
        ok: skills.filter((s) => s.level === 3),
        learning: skills.filter((s) => s.level <= 2),
    });

    const { veryGood, medium, ok, learning } = categorize(skills);

    const renderSkillList = (list) =>
        list.length > 0 ? (
        <ul className="skill-list">
            {list.map((skill) => (
            <li key={skill.id}>
                {skill.name} <span className="text-muted">({skill.level})</span>
            </li>
            ))}
        </ul>
        ) : (
        <p className="text-muted">+ Перелік навичок</p>
        );

    return(
        <>
       <section class="featured-product">
        <div class="container">
        <div class="row">
            <div class="col-lg-12">
            <div class="section-heading">
                <h4>Володіння <em>Навичками</em></h4>
            </div>
            </div>
            <div class="col-lg-3 align-self-center">
            <div class="left-info">
                <div class="col-lg-12">
                <div class="info-item">
                    <div class="icon">
                    <img src="assets/images/service-icon-01.png" alt=""/>
                    </div>
                    <h4>Дуже добре</h4>
                    <p>Більше одного року</p>
                    {renderSkillList(veryGood)}
                </div>
                </div>
                <div class="col-lg-12">
                <div class="info-item last-info">
                    <div class="icon">
                    <img src="assets/images/service-icon-02.png" alt=""/>
                    </div>
                    <h4>Непогано</h4>
                    <p>~Один рік</p>
                    {renderSkillList(medium)}
                </div>
                </div>
            </div>
            </div>
            <div className="col-lg-6 text-center">
                <div className="card p-4 shadow-sm">
                <h5>Додати нову навичку</h5>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Назва навички..."
                    value={newSkill.name}
                    onChange={(e) =>
                    setNewSkill({ ...newSkill, name: e.target.value })
                    }
                />
                <label>Рівень володіння: {newSkill.level}</label>
                <input
                    type="range"
                    min="2"
                    max="5"
                    className="form-range mb-3"
                    value={newSkill.level}
                    onChange={(e) =>
                    setNewSkill({ ...newSkill, level: Number(e.target.value) })
                    }
                />
                <button className="btn btn-primary" onClick={handleAddSkill}>
                    Додати
                </button>
                </div>
            </div>
            <div class="col-lg-3 align-self-center">
            <div class="right-info">
                <div class="col-lg-12">
                <div class="info-item">
                    <div class="icon">
                    <img src="assets/images/service-icon-03.png" alt=""/>
                    </div>
                    <h4>Середньо</h4>
                    <p>~Шість місяців</p>
                    {renderSkillList(ok)}
                </div>
                </div>
                <div class="col-lg-12">
                <div class="info-item last-info">
                    <div class="icon">
                    <img src="assets/images/service-icon-04.png" alt=""/>
                    </div>
                    <h4>Є чому вчитися</h4>
                    <p>~    Один місяць</p>
                    {renderSkillList(learning)}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
        </>
        

    )
}

export default Skills