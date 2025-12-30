import {Link, useLocation, useNavigate} from "react-router-dom"
import PropTypes from 'prop-types';
import * as React from 'react';
import AuthContext from "./context/AuthContext";

const Navbar = () =>{
  const location = useLocation()
  const path = location.pathname
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {user, logoutUser} = React.useContext(AuthContext)
  const navigate = useNavigate()

    return(
        <>
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link to="/" className="logo">
                <img
                  src="/assets/images/templatemo-eduwell.png"
                  alt="EduWell Template"
                />
              </Link>

              <ul className="nav">
                {!user ? (
                  <>
                <li>
                  <Link
                    to="/register"
                    className={path === "/register" ? "active" : ""}
                  >
                    Регістрація
                  </Link>
                </li>

                
                <li>
                  <Link
                    to="/login"
                    className={path === "/login" ? "active" : ""}
                  >
                    Логін
                  </Link>
                </li>
                </>
                ) : (
                <>
                <li>
                  <Link
                    to="/"
                    className={path === "/" ? "active" : ""}
                  >
                    Головна
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className={path === "/about" ? "active" : ""}
                  >
                    Про нас
                  </Link>
                </li>
                 </>
                )}

              </ul>

              <a
                className="menu-trigger"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <span>Меню</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
        </>
    )
}

export default Navbar