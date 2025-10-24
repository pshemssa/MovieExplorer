import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchShowById } from '../utils/api';
import { useFavorites } from '../hooks/useFavorites';
import { Star, Clock, Calendar, ChevronLeft, Heart } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const controller = new AbortController();
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchShowById(id, { signal: controller.signal });
        setMovie(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96"></div>
            <div className="md:col-span-2 space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error || 'Movie not found'}</p>
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const imageUrl = movie.image?.original || movie.image?.medium || 'https://via.placeholder.com/680x1000?text=No+Image';
  const rating = movie.rating?.average?.toFixed(1) || 'N/A';
  const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
  const premiered = movie.premiered ? new Date(movie.premiered).getFullYear() : 'N/A';

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Home
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="md:col-span-1">
          <img
            src={imageUrl}
            alt={movie.name}
            className="w-full rounded-xl shadow-xl"
            loading="lazy"
          />
        </div>

        {/* Details */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {movie.name}
            </h1>
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-medium text-gray-900 dark:text-white">{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              <span>{runtime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-5 h-5" />
              <span>{premiered}</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Summary</h2>
            <div
              className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: movie.summary || '<p>No summary available.</p>' }}
            />
          </div>

          <button
            onClick={() => toggleFavorite(movie)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              isFavorite(movie.id)
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite(movie.id) ? 'fill-current' : ''}`} />
            {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;