import { useState, useEffect } from 'react';
import { fetchMovieCredits } from '../services/fetchMovie';
export default function Cast({ idMovie }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (cast.length === 0) {
      fetchMovieCredits(idMovie)
        .then(response => {
          setCast(() => response.data.cast);
        })
        .finally();
    }
  });

  return (
    <ul>
      {cast.map(({ name, profile_path, character }) => (
        <li>
          <h3>{name}</h3>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : 'https://dummyimage.com/200x300/f0ede4/000333.png&text=No+photo'
            }
            alt={name}
          />
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
}
