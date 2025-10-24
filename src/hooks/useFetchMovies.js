import { useState, useEffect } from 'react';
import { fetchAllShows } from '../utils/api';

export const useFetchMovies = (page = 1, search = '', category = 'All') => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllShows({ page, search, category, signal: controller.signal });
        setMovies(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || 'Failed to load movies');
        }
      } finally {
        setLoading(false);
      }
    };

    loadMovies();

    return () => controller.abort();
  }, [page, search, category]);

  return { movies, loading, error };
};