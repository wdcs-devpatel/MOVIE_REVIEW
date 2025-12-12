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
                <option value="Animation">Animation</option>
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
                <option value="2025-2020">2020 - 2025</option>
                <option value="2020-2015">2015 - 2020</option>
                <option value="2015-2010">2010 - 2015</option>
                <option value="2010-2000">2000 - 2010</option>
                <option value="2000-1990">1990 - 2000</option>
                <option value="1990-1970">1970 - 1990</option>
                <option value="before-1970">Before 19 70</option>
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
