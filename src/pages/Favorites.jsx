import { useFavorites } from '../hooks/useFavorites';
import { MovieCard } from '../components/MovieCard';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Favorites</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You haven't added any movies to favorites yet.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;