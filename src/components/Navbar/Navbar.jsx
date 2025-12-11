import { Link, NavLink } from "react-router-dom";
import { useWatchlist } from "../../context/WatchlistContext";
import useTheme from "../../context/ThemeContext";

export default function Navbar() {
  const { watchlist } = useWatchlist();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">MovieHub</Link>
      </div>

      <div className="nav-right">
        <NavLink to="/" className="nav-link" end>Home</NavLink>
        <NavLink to="/search" className="nav-link">Search</NavLink>
        <NavLink to="/watchlist" className="nav-link">
          Watchlist ({watchlist.length})
        </NavLink>

        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}
