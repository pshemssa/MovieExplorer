import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShowById } from '../utils/api';
import { Heart, Star, Calendar, Clock, ArrowLeft, Globe, Loader2 } from 'lucide-react';

export const MovieDetails = ({ isFavorite, onToggleFavorite }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchShowById(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 dark:text-red-200 text-xl font-bold mb-2">Error Loading Movie</h2>
          <p className="text-red-600 dark:text-red-300">{error || 'Movie not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = movie.image?.original || 'https://via.placeholder.com/500x750?text=No+Image';
  const rating = movie.rating?.average || 'N/A';
  const summary = movie.summary?.replace(/<[^>]*>/g, '') || 'No summary available.';

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 lg:w-1/4">
            <img
              src={imageUrl}
              alt={movie.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-2/3 lg:w-3/4 p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {movie.name}
                </h1>
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => onToggleFavorite(movie)}
                className={`p-3 rounded-full transition-all ${
                  isFavorite(movie.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite(movie.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-900 dark:text-white">{rating}</span>
              </div>

              {movie.premiered && (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(movie.premiered).getFullYear()}</span>
                </div>
              )}

              {movie.runtime && (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span>{movie.runtime} min</span>
                </div>
              )}

              {movie.language && (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Globe className="w-5 h-5" />
                  <span>{movie.language}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{summary}</p>
            </div>

            {movie.network && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Network</h3>
                <p className="text-gray-600 dark:text-gray-400">{movie.network.name}</p>
              </div>
            )}

            {movie.status && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Status</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  movie.status === 'Running'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  {movie.status}
                </span>
              </div>
            )}

            {movie.officialSite && (
              <a
                href={movie.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Globe className="w-5 h-5" />
                <span>Visit Official Site</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
