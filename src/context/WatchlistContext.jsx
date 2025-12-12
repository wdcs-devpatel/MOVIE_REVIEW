import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem("watchlist");
      if (saved) {
        setWatchlist(JSON.parse(saved));
      }
    } catch (err) {
      console.warn("LocalStorage blocked — watchlist won't persist", err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } catch (err) {
      console.warn("Unable to save watchlist:", err);
    }
  }, [watchlist]);

  function addToWatchlist(movie) {
    setWatchlist((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  }

 
  function removeFromWatchlist(id) {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  }

  
  function isInWatchlist(id) {
    return watchlist.some((m) => m.id === id);
  }

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
