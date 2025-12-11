import MovieCard from "../MovieCard/MovieCard";

export default function MovieGrid({ movies }) {
  return (
    <div className="movie-grid-wrapper">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
