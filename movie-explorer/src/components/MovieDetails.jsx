import { useParams } from 'react-router-dom';
import useFetchMovies from '../hooks/useFetchMovies.js'; // Reusing to fetch single, but adjust if needed

function MovieDetails() {
  const { id } = useParams();
  // For single movie, fetch separately
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <h1>{movie.name}</h1>
      <img src={movie.image?.original} alt={movie.name} width="300" />
      <p>{movie.summary}</p>
      <p>Genres: {movie.genres.join(', ')}</p>
    </div>
  );
}

export default MovieDetails;