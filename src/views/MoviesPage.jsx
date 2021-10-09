import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { useLocation, useRouteMatch, useHistory } from 'react-router';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { fetchMovieSearch } from '../services/fetchMovie';

export default function MoviesView() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [prevStateQuery, setPrevStateQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const queryParams = queryString.parse(history.location.search).query;
  console.log(queryParams);
  useEffect(() => {
    if (query !== '') {
      setLoading(() => true);
      fetchMovieSearch({ query: query })
        .then(response => {
          setMovies(() => [...response.data.results]);
        })
        .finally(() => {
          setLoading(() => false);
        });
    }
  }, [query]);

  useEffect(() => {
    if (queryParams) {
      setQuery(() => queryParams);
      setLoading(() => true);
      fetchMovieSearch({ query: queryParams })
        .then(response => {
          setMovies(() => [...response.data.results]);
        })
        .finally(() => setLoading(() => false));
    }
  }, [queryParams]);
  const handleChange = e => {
    setMovies([]);
    setQuery('');
    setPrevStateQuery(e.currentTarget.value.replace(' ', '+'));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (prevStateQuery.trim() === '') {
      toast.error('Search field is empty!');
      return;
    }
    setQuery(prevStateQuery);
    history.push({ ...location, search: `query=${prevStateQuery}` });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search movie"
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {movies.map(({ id, title }) => (
          <li key={id}>
            {' '}
            <Link to={`${url}/${id}`} query={query}>
              {title}
            </Link>
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
