import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Components/Navigation';
import LoadingLoader from './Components/Loader/Loader';

const Container = styled.div`
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 22px;
`;

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
  ),
);

function App() {
  return (
    <>
      <Container>
        <Navigation />
        <Suspense fallback={<LoadingLoader />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/movies" component={MoviesPage} />
            <Route path="/movies/:movieId" component={MovieDetailsPage} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
