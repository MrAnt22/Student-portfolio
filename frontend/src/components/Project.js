import { useEffect, useState } from "react";
import AxiosInstance from "./Axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import "../Project.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Project = () => {
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const gh = await AxiosInstance.get("api/github_stats/");
      setStats(gh.data);

      const pr = await AxiosInstance.get("api/project/");
      setProjects(pr.data);
    };
    load();
  }, []);

  if (!stats) return <p>Loading...</p>;

  const pieData = {
    labels: stats.top_languages.map(l => l[0]),
    datasets: [{
      data: stats.top_languages.map(l => l[1]),
      backgroundColor: [
        "#8e44ad", "#3498db", "#2ecc71", "#f1c40f", "#e74c3c"
      ],
    }]
  };

  return (
    <section className="github-page">
      <div className="github-container">

        <button type="submit"
                className="btn btn-outline-dark" onClick={() => navigate(-1)}>Back</button>
        <h2 className="github-title">GitHub інформація <em>{stats.github_username}</em></h2>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-number">{stats.repo_count}</div>
            <div className="metric-label">Репозиторії</div>
          </div>

          <div className="metric-card">
            <div className="metric-number">{stats.total_stars}</div>
            <div className="metric-label">Зірочки ⭐</div>
          </div>

          <div className="metric-card">
            <div className="metric-number">{stats.total_watchers}</div>
            <div className="metric-label">Переглядів</div>
          </div>
        </div>

        <div className="chart-box">
          <h4>Мови програмування</h4>
          <div className="pie-wrapper">
            <Pie data={pieData} />
          </div>
        </div>

        <h3>ТОП репозиторії</h3>
        <div className="repo-grid">
          {stats.top_repos.map(r => (
            <div className="repo-card" key={r.name}>
              <a href={r.url}>{r.name}</a>
              <div className="repo-stars">⭐ {r.stars}</div>
              <div className="repo-lang">{r.language || "Unknown"}</div>
            </div>
          ))}
        </div>

        <div className="largest-repo">
          <h4>Найбільший репозиторій:</h4>
          <a href={stats.largest_repo.url}>{stats.largest_repo.name}</a>
          <p>Розмір: {stats.largest_repo.size} KB</p>
        </div>

      </div>
    </section>
  );
};

export default Project;