import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Navbar from "./components/Navbar.jsx";
import Watchlist from "./pages/Watchlist/Watchlist.jsx";
import Search from "./pages/Search/Search.jsx";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
}
