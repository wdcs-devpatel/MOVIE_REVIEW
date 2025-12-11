        import { useState } from "react";

        export default function Filters({ onFilterChange }) {
        const [genre, setGenre] = useState("");
        const [year, setYear] = useState("");
        const [rating, setRating] = useState("");

        function updateFilters(newFilters) {
            onFilterChange({
            genre: newFilters.genre ?? genre,
            year: newFilters.year ?? year,
            rating: newFilters.rating ?? rating,
            });

            if (newFilters.genre !== undefined) setGenre(newFilters.genre);
            if (newFilters.year !== undefined) setYear(newFilters.year);
            if (newFilters.rating !== undefined) setRating(newFilters.rating);
        }

        return (
            <div className="filters-container">

            <select
                value={genre}
                onChange={(e) => updateFilters({ genre: e.target.value })}
                className="filter-select"
            >
                <option value="">All Genres</option>
                <option value="Drama">Drama</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Sci-Fi">Sci-Fi</option>
            </select>

            <select
                value={year}
                onChange={(e) => updateFilters({ year: e.target.value })}
                className="filter-select"
            >
                <option value="">All Years</option>
                {Array.from({ length: 25 }).map((_, i) => {
                const y = 2024 - i;
                return <option key={y} value={y}>{y}</option>;
                })}
            </select>

            <select
                value={rating}
                onChange={(e) => updateFilters({ rating: e.target.value })}
                className="filter-select"
            >
                <option value="">Any Rating</option>
                <option value="8">8+ ⭐</option>
                <option value="7">7+ ⭐</option>
                <option value="6">6+ ⭐</option>
                <option value="5">5+ ⭐</option>
            </select>

            </div>
        );
        }
