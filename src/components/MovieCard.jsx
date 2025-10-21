import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';

export const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const imageUrl = movie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';
  const rating = movie.rating?.average || 'N/A';

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative overflow-hidden aspect-[2/3]">
          <img
            src={imageUrl}
            alt={movie.name}
            className="w-full h-full  group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {movie.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
          {movie.genres && movie.genres.length > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {movie.genres[0]}
            </span>
          )}
        </div>

        <button
          onClick={() => onToggleFavorite(movie)}
          className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg font-medium transition-all ${
            isFavorite
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          <span>{isFavorite ? 'Remove' : 'Add to Favorites'}</span>
        </button>
      </div>
    </div>
  );
};
