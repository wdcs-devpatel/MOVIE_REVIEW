export default function ErrorState({ retry }) {
  return (
    <div className="error-box">
      <p className="error-text">Failed to load movies.</p>
      <button className="retry-btn" onClick={retry}>
        Retry
      </button>
    </div>
  );
}
