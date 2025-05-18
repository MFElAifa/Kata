
import { NavLink } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import '../css/Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <header className="main-header">
            <nav className="nav-container">
                <div className="nav-left">
                    {isAdmin ? (
                        <>
                        <NavLink to="/admin" end className="nav-link">Questions</NavLink>
                        <NavLink to="/admin/survey" className="nav-link">Survey</NavLink>
                        <NavLink to="/admin/feedback" className="nav-link">FeedBack</NavLink>
                        </>
                    ) : (
                        <>
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/feedback" className="nav-link">Feedback</NavLink>
                        </>
                    )}
                </div>

                <div className="nav-right">
                    {isAdmin ? (
                        <button className="btn btn-light btn-sm" onClick={handleLogout}>Déconnexion</button>
                    ) : (
                        <NavLink to="/login" className="nav-link">Administrator</NavLink>
                    )}
                </div>
      </nav>
    </header>
    );
};

export default Header;