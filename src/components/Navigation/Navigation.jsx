import { NavLink } from 'react-router-dom';
const Navigation = () => (
  <header>
    <h1>Cinemafan</h1>
    <ul>
      <li>
        <NavLink
          exact
          to="/"
          className="NavLink"
          activeClassName="NavLink--active"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/movies"
          className="NavLink"
          activeClassName="NavLink--active"
        >
          Movie
        </NavLink>
      </li>
    </ul>
  </header>
);
export default Navigation;
