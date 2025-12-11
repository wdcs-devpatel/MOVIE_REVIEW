import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = window.localStorage.getItem("watchlist");
      if (saved) setWatchlist(JSON.parse(saved));
    } catch (e) {
      console.warn("LocalStorage blocked, running without persistence");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } catch (e) {
      console.warn("Unable to save watchlist:", e);
    }
  }, [watchlist]);

  function addToWatchlist(movie) {
    setWatchlist((prev) => [...prev, movie]);
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
