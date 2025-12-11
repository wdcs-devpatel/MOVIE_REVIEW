import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Navbar from "./components/Navbar/Navbar";
import Watchlist from "./pages/Watchlist/Watchlist";
import Search from "./pages/Search/Search";  

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
