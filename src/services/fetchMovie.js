import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '85bec31195c6b42626a6d2b2aafa09e6';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

const fetchMoviesTrending = async () => {
  return await axios.get('/trending/movie/day');
};

const fetchMovieSearch = async ({ query }) => {
  return await axios.get('/search/movie', {
    params: {
      query: query,
    },
  });
};

const fetchMovieDetails = async id => {
  return await axios.get(`/movie/${id}`, {
    params: {
      movie_id: id,
    },
  });
};

const fetchMovieCredits = async id => {
  return await axios.get(`/movie/${id}/credits`);
};

const fetchMovieReviews = async id => {
  return await axios.get(`/movie/${id}/reviews`);
};

// const fetchGenres = async ({ id }) => {
//   return await axios.get(`/movie/${id}/reviews`);
// };

export {
  fetchMoviesTrending,
  fetchMovieSearch,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};
