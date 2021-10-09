import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { fetchMoviesTrending } from '../services/fetchMovie';

export default function HomeView() {
  const { url } = useRouteMatch();
  const [moviesTrending, setMoviesTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (moviesTrending.length === 0) {
      setLoading(() => true);
      fetchMoviesTrending()
        .then(response => {
          setMoviesTrending(() => [...response.data.results]);
        })
        .finally(() => setLoading(() => false));
    }
  }, [moviesTrending.length]);
  return (
    <section>
      <h1>Trending today</h1>
      <ul>
        {moviesTrending.map(({ id, title }) => (
          <li key={id}>
            <Link to={`${url}movies/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
      {loading && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
    </section>
  );
}
