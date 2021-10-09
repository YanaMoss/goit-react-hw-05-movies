import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container.jsx/Container';
import Navigation from './components/Navigation/Navigation';

const HomePage = lazy(() =>
  import('./views/HomePage.jsx' /*webpackChunkName: "home-page"*/),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage.jsx' /*webpackChunkName: "MoviesPage"*/),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage.jsx' /*webpackChunkName: "MovieDetailsPage"*/
  ),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView.jsx' /*webpackChunkName: "NotFoundView"*/),
);

const App = () => (
  <div>
    <Container>
      <Navigation />
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
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  </div>
);
export default App;
