import { useState, useEffect, lazy, useRef } from 'react';
import {
  Route,
  useParams,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import { getMovieInform } from '../../movies-api/movies-api';
import Loading from '../../Components/Loader/Loader';
import Toastify from '../../Components/Toastify/Toastify';
import NoResults from '../../Components/Noresults/Noresults';
import ImageNotAvailable from '../../images/notavailable.png';

const MovieDetailsContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
`;

const MovieDetailsWrapper = styled.div`
  display: flex;
  padding: 20px 150px;
`;

const MovieDetailsWrapperImg = styled.div`
  margin-right: 50px;
  min-width: 350px;
  max-width: 350px;
  height: 100%;
`;

const MovieDetailsImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const MovieDetailsDescription = styled.div`
  color: white;
`;

const MovieDetailsTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 30px;
`;

const MovieDetailsList = styled.ul`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
`;

const MovieDetailsItem = styled.li`
  color: white;

  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const MovieDetailsHighlight = styled.span`
  font-weight: 400;
`;

const MovieDetailsOverview = styled.div`
  margin-bottom: 20px;
`;

const MovieDetailsOverviewTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 24px;
`;

const MovieDetailsOverviewText = styled.p`
  padding-left: 20px;
  font-size: 20px;
`;

const MovieDetailsGenres = styled.div`
  margin-bottom: 20px;
`;

const MovieDetailsGenresTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 24px;
`;

const MovieDetailsGenresList = styled.ul`
  padding-left: 20px;
  font-size: 20px;
`;

const MovieDetailsGenresItem = styled.li`
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const MovieDetailsCountries = styled.div``;

const MovieDetailsCountriesTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 24px;
`;

const MovieDetailsCountriesList = styled.ul`
  padding-left: 20px;
  font-size: 20px;
`;

const MovieDetailsCountriesItem = styled.li`
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const AddInfoWrapper = styled.div`
  padding: 10px 150px;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  background-color: rgba(0, 0, 0, 0.7);
  margin-bottom: 20px;
`;

const AddInfoTitle = styled.h3`
  font-size: 24px;
  color: white;
`;

const AddInfoList = styled.ul`
  padding-top: 10px;
  font-size: 20px;
`;

const AddInfoItem = styled.li`
  :not(:last-child) {
    margin-bottom: 5px;
  }
`;

const AddInfoNavLink = styled(NavLink)`
  padding: 5px;
  color: white;
  line-height: 1;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  :hover {
    color: lightblue;
  }

  &.active {
    color: blue;
  }
`;

const BackButton = styled.button`
  display: block;
  max-width: 140px;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  color: white;
  line-height: 1;
  border: 1px solid white;
  border-radius: 2px;
  background-color: blue;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  margin-left: 150px;

  :hover {
    color: black;
    background-color: lightblue;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.6);
  }
`;

const Cast = lazy(() =>
  import('../../Components/Cast/Cast' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('../../Components/Reviews/Reviews' /* webpackChunkName: "Reviews" */),
);

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const { movieId } = useParams();
  const [movieInform, setMovieInform] = useState({});
  const [status, setStatus] = useState(null);
  const currentLocation = useRef(location);
  const history = useHistory();

  useEffect(() => {
    const { PENDING, RESOLVED, NOTFOUND } = Status;
    setStatus(PENDING);
    getMovieInform(movieId)
      .then(data => {
        if (Object.keys(data).length === 0) {
          setStatus(NOTFOUND);
          Toastify('warning', 'Sorry, there are no movies!');
        } else {
          setMovieInform(data);
          setStatus(RESOLVED);
        }
      })
      .catch(error => {
        setStatus(NOTFOUND);
        Toastify('error', `${error}`);
      });
  }, [movieId]);

  const previousPage = () => {
    if (!currentLocation.current.state) {
      return history.push('/movies');
    }

    const getStateFrom = currentLocation.current.state.from;
    history.push(
      getStateFrom.search
        ? getStateFrom.pathname + getStateFrom.search
        : getStateFrom.pathname,
    );
  };

  return (
    <>
      {status === 'pending' && <Loading />}
      <MovieDetailsContainer>
        <BackButton onClick={previousPage}>Return</BackButton>
        {status === 'notFound' && <NoResults />}
        {status === 'resolved' && (
          <>
            <MovieDetailsWrapper>
              <MovieDetailsWrapperImg>
                <MovieDetailsImg
                  src={
                    movieInform.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movieInform.poster_path}`
                      : ImageNotAvailable
                  }
                  alt={
                    movieInform.title
                      ? movieInform.title
                      : movieInform.original_title
                  }
                />
              </MovieDetailsWrapperImg>
              <MovieDetailsDescription>
                <MovieDetailsTitle>
                  {movieInform.title
                    ? movieInform.title
                    : movieInform.original_title}{' '}
                  ({movieInform.release_date.slice(0, 4)})
                </MovieDetailsTitle>
                <MovieDetailsList>
                  <MovieDetailsItem>
                    Vote count:{' '}
                    <MovieDetailsHighlight>
                      {movieInform.vote_count}
                    </MovieDetailsHighlight>
                  </MovieDetailsItem>
                  <MovieDetailsItem>
                    Vote average:{' '}
                    <MovieDetailsHighlight>
                      {movieInform.vote_average}
                    </MovieDetailsHighlight>
                  </MovieDetailsItem>
                </MovieDetailsList>
                <MovieDetailsOverview>
                  <MovieDetailsOverviewTitle>
                    Overview:
                  </MovieDetailsOverviewTitle>
                  <MovieDetailsOverviewText>
                    {movieInform.overview}
                  </MovieDetailsOverviewText>
                </MovieDetailsOverview>
                <MovieDetailsGenres>
                  <MovieDetailsGenresTitle>Genres:</MovieDetailsGenresTitle>
                  <MovieDetailsGenresList>
                    {movieInform.genres.map(element => (
                      <MovieDetailsGenresItem key={element.id}>
                        {element.name}
                      </MovieDetailsGenresItem>
                    ))}
                  </MovieDetailsGenresList>
                </MovieDetailsGenres>
                <MovieDetailsCountries>
                  <MovieDetailsCountriesTitle>
                    Production countries:
                  </MovieDetailsCountriesTitle>
                  <MovieDetailsCountriesList>
                    {movieInform.production_countries.map(element => (
                      <MovieDetailsCountriesItem key={element.name}>
                        {element.name}
                      </MovieDetailsCountriesItem>
                    ))}
                  </MovieDetailsCountriesList>
                </MovieDetailsCountries>
              </MovieDetailsDescription>
            </MovieDetailsWrapper>
            <AddInfoWrapper>
              <AddInfoTitle>Additional information:</AddInfoTitle>
              <AddInfoList>
                <AddInfoItem>
                  <AddInfoNavLink
                    to={{
                      pathname: `${url}/cast`,
                      state: { from: location },
                    }}
                  >
                    Cast
                  </AddInfoNavLink>
                </AddInfoItem>
                <AddInfoItem>
                  <AddInfoNavLink
                    to={{
                      pathname: `${url}/reviews`,
                      state: { from: location },
                    }}
                  >
                    Reviews
                  </AddInfoNavLink>
                </AddInfoItem>
              </AddInfoList>
            </AddInfoWrapper>
            <div>
              <Route exact path={`${path}/cast`} component={Cast} />
              <Route exact path={`${path}/reviews`} component={Reviews} />
            </div>
          </>
        )}
      </MovieDetailsContainer>
    </>
  );
}
