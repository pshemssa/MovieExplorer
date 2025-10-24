import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'movieFavorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === movie.id)) return prev;
      const updated = [...prev, movie];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => {
      const updated = prev.filter((f) => f.id !== movieId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (movieId) => favorites.some((f) => f.id === movieId);

  const toggleFavorite = (movie) => {
    isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
};