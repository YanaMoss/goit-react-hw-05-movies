import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router';
import { Link, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { fetchMovieDetails } from '../services/fetchMovie';
const Cast = lazy(() => import('./Cast.jsx' /*webpackChunkName: "Cast"*/));
const Reviews = lazy(() =>
  import('./Reviews.jsx' /*webpackChunkName: "Reviews"*/),
);
export default function MovieDetailsPage({ query }) {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const { goBack } = useHistory();
  const [overview, setOverview] = useState('');
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState(
    'https://dummyimage.com/200x300/f0ede4/000333.png&text=No+poster',
  );
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (title === '') {
      fetchMovieDetails(movieId)
        .then(response => {
          getPoster(response.data.poster_path);
          setTitle(() => response.data.title);
          setOverview(() => response.data.overview);
          setGenres(() => response.data.genres);
        })
        .finally();
    }
  });
  const getPoster = posterPath => {
    const urlPoster = 'https://image.tmdb.org/t/p/w300/';
    setPoster(urlPoster + posterPath);
  };
  return (
    <div>
      <Link to={`${url}`}>
        <button type="button" onClick={goBack}>
          Go back
        </button>
      </Link>
      <div>
        <img src={poster} alt="" />
        <h2>{title}</h2>
        <ul>
          <li>
            <h3>Overview</h3>
            <p>{overview}</p>
          </li>
          <li>
            <h3>Genres</h3>
            <ul>
              {genres.map(({ name }) => (
                <li>{name}</li>
              ))}
            </ul>
          </li>
        </ul>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to={`${url}/cast`}>Cast</Link>
          </li>
          <li>
            <li>
              <Link to={`${url}/reviews`}>Reviews</Link>
            </li>
          </li>
        </ul>
      </div>
      <Suspense
        fallback={
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        }
      >
        <Route path={`${url}/cast`}>
          <Cast idMovie={movieId} />
        </Route>
        <Route path={`${url}/reviews`}>
          <Reviews idMovie={movieId} />
        </Route>
      </Suspense>
    </div>
  );
}
