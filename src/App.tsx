import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { MovieDetails } from './pages/MovieDetails';
import { useFetchMovies } from './hooks/useFetchMovies';
import { useFavorites } from './hooks/useFavorites';

function App() {
  const { movies, loading, error } = useFetchMovies();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          favoriteCount={favorites.length}
        />

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  movies={movies}
                  loading={loading}
                  error={error}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/movie/:id"
              element={
                <MovieDetails
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
