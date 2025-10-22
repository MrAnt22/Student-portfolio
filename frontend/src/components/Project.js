import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import AxiosInstance from "./Axios";

const Project = () =>{
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
        try {
            const response = await AxiosInstance.get("api/github_stats/");
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching GitHub stats:", error);
        }
        };
        fetchStats();
    }, []);

    if (!stats) return <p>Loading...</p>;

    return(
        <>
       <section class="more-info">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <div class="section-heading">
            <h4>Мої проекти з<em> GitHub</em></h4>
          </div>
          <p>Найпопулярніші ропозиторії по зірочкам:</p>
          <ul>
            {stats.top_repos.map((repo) => (
                <li key={repo.name}>
                    {repo.stars} : <a href={repo.url}>{repo.name}</a>
                </li>
            ))}
          </ul>
        </div>
        <div class="col-lg-6 offset-lg-1 align-self-center">
          <div class="row">
            <div class="col-6">
              <div class="count-area-content">
                <div class="count-digit">{stats.repo_count}</div>
                <div class="count-title">Всього репозиторіїв</div>
              </div>
            </div>
            <div class="col-6">
              <div class="count-area-content">
                <div class="count-digit">{stats.total_stars}</div>
                <div class="count-title">Всього зірочок</div>
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

export default Project