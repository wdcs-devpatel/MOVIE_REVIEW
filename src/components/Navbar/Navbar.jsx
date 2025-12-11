import { Link } from "react-router-dom";
import { useWatchlist } from "../../context/WatchlistContext";

export default function Navbar() {
  const { watchlist } = useWatchlist();

  return (
    <nav className="navbar">

      <div className="nav-left">
        <Link to="/" className="nav-logo">MovieHub</Link>
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/search" className="nav-link">Search</Link>

        <Link to="/watchlist" className="nav-link">
          Watchlist <span className="watchlist-count">({watchlist.length})</span>
        </Link>
      </div>

    </nav>
  );
}
