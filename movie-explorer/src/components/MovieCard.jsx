import { Link } from 'react-router-dom';

function MovieCard({ movie, onAddToFavorites, isFavorite }) {
  return (
    <div className="movie-card">
      <img src={movie.image?.medium} alt={movie.name} width="100" />
      <h3>{movie.name}</h3>
      <Link to={`/movie/${movie.id}`}>Details</Link>
      <button onClick={() => onAddToFavorites(movie)}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default MovieCard;