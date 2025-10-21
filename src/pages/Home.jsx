import { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { MovieCard } from '../components/MovieCard';
import { Loader2 } from 'lucide-react';

export const Home = ({ movies, loading, error, isFavorite, onToggleFavorite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const genreSet = new Set();
    movies.forEach((movie) => {
      if (movie.genres && movie.genres.length > 0) {
        movie.genres.forEach((genre) => genreSet.add(genre));
      }
    });
    return Array.from(genreSet).sort();
  }, [movies]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' ||
        (movie.genres && movie.genres.includes(selectedCategory));
      return matchesSearch && matchesCategory;
    });
  }, [movies, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 dark:text-red-200 text-xl font-bold mb-2">Error Loading Movies</h2>
          <p className="text-red-600 dark:text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white py-12 px-6 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Discover Amazing Movies</h1>
        <p className="text-blue-100 text-lg">Explore thousands of shows and add your favorites</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="pt-2">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <p className="text-gray-500 dark:text-gray-400 text-xl">No movies found</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredMovies.length} {filteredMovies.length === 1 ? 'Movie' : 'Movies'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite(movie.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
