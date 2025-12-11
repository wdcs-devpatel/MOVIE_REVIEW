const TMDB_KEY = "261f7c6a5c87caf8ceb6d16dbef56df2";

let tmdbGenreList = [];

async function loadTmdbGenres() {
  if (tmdbGenreList.length > 0) return tmdbGenreList;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_KEY}`
    );
    const json = await res.json();
    tmdbGenreList = json.genres || [];
    return tmdbGenreList;
  } catch {
    return [];
  }
}

export async function fetchGenreForMovie(title) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(
        title
      )}`
    );

    const json = await res.json();
    if (!json.results || json.results.length === 0) return ["Unknown"];

    const movie = json.results[0];
    const genreIds = movie.genre_ids || [];

    const allGenres = await loadTmdbGenres();

    return genreIds.map((id) => {
      const g = allGenres.find((x) => x.id === id);
      return g ? g.name : "Unknown";
    });
  } catch {
    return ["Unknown"];
  }
}
