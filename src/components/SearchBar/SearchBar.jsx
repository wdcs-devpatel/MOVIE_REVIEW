import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setText(value);
    onSearch(value);
  }

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search movies..."
        value={text}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
}
