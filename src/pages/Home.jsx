import { useState, useMemo } from 'react';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import Pagination from '../components/pagination';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { useFavorites } from '../hooks/useFavorites';
import HeroSection from '../components/Hero';

const ITEMS_PER_PAGE = 12;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const { movies, loading, error } = useFetchMovies();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Extract unique categories safely
  const categories = useMemo(() => {
    if (!Array.isArray(movies)) return [];
    const cats = new Set();
    movies.forEach((movie) => {
      if (Array.isArray(movie.genres)) {
        movie.genres.forEach((g) => cats.add(g));
      }
    });
    return Array.from(cats).sort();
  }, [movies]);

  // Filter & search logic
  const filteredMovies = useMemo(() => {
    if (!Array.isArray(movies)) return [];

    return movies.filter((movie) => {
      const matchesSearch = movie.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || movie.genres?.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [movies, searchQuery, selectedCategory]);

  // Pagination
  const totalItems = filteredMovies.length;
  const paginatedMovies = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredMovies.slice(start, end);
  }, [filteredMovies, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className=" flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <p className="text-red-600 dark:text-red-400 text-lg">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (filteredMovies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {searchQuery || selectedCategory !== 'All'
            ? 'No movies found matching your filters.'
            : 'No movies available.'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white">
      {/* Search + Filter */}
      <HeroSection  movies={movies} 
      onToggleFavorite={toggleFavorite}
      isFavorite={isFavorite}/><br/>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        </div>
        <div className="md:w-64">
         
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />
           <br/>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;