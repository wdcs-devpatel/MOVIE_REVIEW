import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import MovieDetail from "../pages/MovieDetail.jsx";
import Watchlist from "../pages/Watchlist/Watchlist.jsx";
import Search from "../pages/Search/Search.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}
        