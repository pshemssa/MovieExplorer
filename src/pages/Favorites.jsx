import { MovieCard } from '../components/MovieCard';
import { Heart } from 'lucide-react';

export const Favorites = ({ favorites, isFavorite, onToggleFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Heart className="w-24 h-24 text-gray-300 dark:text-gray-700 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          No Favorite Movies Yet
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md">
          Start exploring movies and click the heart icon to add them to your favorites!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-700 dark:to-pink-800 text-white py-12 px-6 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-4">
          <Heart className="w-12 h-12 fill-current" />
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Favorites</h1>
            <p className="text-red-100 text-lg">
              You have {favorites.length} favorite {favorites.length === 1 ? 'movie' : 'movies'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};
