import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../services/fetchMovie';

export default function Reviews({ idMovie }) {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState('');

  useEffect(() => {
    if (totalReviews !== 0) {
      fetchMovieReviews(idMovie)
        .then(response => {
          setReviews(() => response.data.results);
          setTotalReviews(() => response.data.total_results);
        })
        .finally();
    }
  }, [totalReviews]);

  return (
    <section>
      {totalReviews === 0 ? (
        <p>We don't have any reviews for this movie</p>
      ) : (
        <ul>
          {reviews.map(({ author, content }) => (
            <li>
              <p>Author: {author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
