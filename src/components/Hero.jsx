import { useState, useEffect } from 'react';
import { Star, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = ({ movies = [], onToggleFavorite, isFavorite }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Select first 3 movies with images for the hero
  const featuredMovies = movies
    .filter(movie => movie.image?.medium)
    .slice(0, 3);

  // Auto-rotate slides
  useEffect(() => {
    if (featuredMovies.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredMovies.length]);

  // Show nothing if no movies available
  if (featuredMovies.length === 0) {
    return null;
  }

  const currentMovie = featuredMovies[currentSlide];
  const rating = currentMovie.rating?.average?.toFixed(1) || 'N/A';
  const genres = currentMovie.genres?.slice(0, 2).join(' • ') || 'Movie';
  const imageUrl = currentMovie.image?.medium || currentMovie.image?.original;

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <img
          src={imageUrl}
          alt={currentMovie.name}
          className="w-full h-full object-cover opacity-40"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-800 text-white text-sm font-bold rounded-full">
              FEATURED
            </span>
            {rating !== 'N/A' && (
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-white font-semibold">{rating}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {currentMovie.name}
          </h1>

          {/* Summary */}
          {currentMovie.summary && (
            <p className="text-base md:text-lg text-gray-300 line-clamp-3 max-w-xl"
               dangerouslySetInnerHTML={{ 
                 __html: currentMovie.summary.replace(/<[^>]*>/g, '') 
               }}
            />
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
            <button
              onClick={() => onToggleFavorite(currentMovie)}
              className={`px-6 md:px-8 py-2 md:py-3 font-semibold rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 ${
                isFavorite(currentMovie.id)
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-400 hover:bg-gray-400 text-white'
              }`}
            >
              <Heart className={`w-4 md:w-5 h-4 md:h-5 ${isFavorite(currentMovie.id) ? 'fill-current' : ''}`} />
              {isFavorite(currentMovie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <Link
              to={`/movie/${currentMovie.id}`}
              className="px-6 md:px-8 py-2 md:py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-all border border-white/30"
            >
              More Info
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 md:gap-6 pt-2 md:pt-4 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-green-400" />
              <span>Trending Now</span>
            </div>
            {genres && (
              <>
                <div className="h-4 w-px bg-gray-600"></div>
                <span>{genres}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      {featuredMovies.length > 1 && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-green-600' 
                  : 'w-4 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
     
    </div>
  );
};

export default HeroSection;