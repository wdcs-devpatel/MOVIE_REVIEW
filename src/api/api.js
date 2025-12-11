import { fetchGenreForMovie } from "../utils/genreGenerator";

export const MOVIES_API = "https://jsonfakery.com/movies/paginated?page=";

async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    console.error("safeFetch error:", err);
    return { data: [], last_page: 1 };
  }
}


const GENRES = ["Drama", "Action", "Comedy", "Crime", "Romance", "Thriller", "Sci-Fi"];

function assignGenre(movie) {
  const genre = GENRES[movie.id % GENRES.length];
  return {
    ...movie,
    genre,          
    genres: [genre] 
  };
}

export async function getMovies(page = 1) {
  const raw = await safeFetch(`${MOVIES_API}${page}`);
  const movies = raw.data || [];

  const enriched = await Promise.all(
    movies.map(async (m) => {
      const genres = await fetchGenreForMovie(m.original_title);
      return {
        ...m,
        genres,
        genre: genres[0] || "Unknown"
      };
    })
  );

  return {
    data: enriched,
    last_page: raw.last_page
  };
}

export async function searchMovies(query, page = 1) {
  const raw = await safeFetch(`${MOVIES_API}${page}`);

  let movies = raw.data.map((m) => {
    const genre = GENRES[m.id % GENRES.length];

    return {
      ...m,
      genre,
      genres: [genre],
      year: m.release_date ? Number(m.release_date.slice(0, 4)) : null,
      rating: m.vote_average || 0
    };
  });

  movies = movies.filter((m) =>
    m.original_title.toLowerCase().includes(query.toLowerCase())
  );

  const fastResult = {
    data: movies,
    last_page: raw.last_page,
  };

 
  (async () => {
    for (let movie of movies) {
      const tmdbGenres = await fetchGenreForMovie(movie.original_title);
      movie.genres = tmdbGenres;
      movie.genre = tmdbGenres[0] || movie.genre;
    }
  })();

  return fastResult;
}

//hello

export async function getMovieById(id) {
  for (let p = 1; p <= 20; p++) {
    const raw = await safeFetch(`${MOVIES_API}${p}`);
    const movie = raw.data.find((m) => m.id == id);

    if (movie) {
      const genres = await fetchGenreForMovie(movie.original_title);
      return {
        ...movie,
        genres,
        genre: genres[0] || "Unknown"
      };
    }
  }
  return null;
}
