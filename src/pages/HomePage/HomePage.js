import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MovieCard from '../../Components/MovieCard/MovieCard';
import Toastify from '../../Components/Toastify/Toastify';
import LoadingLoader from '../../Components/Loader/Loader';
import { getTrending } from '../../movies-api/movies-api';

const HomeWrapper = styled.div`
  padding: 20px 150px;
`;

const HomeTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: white;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
`;

const HomeList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding-top: 20px;
`;

const LoadMoreButton = styled.button`
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

  margin-left: auto;
  margin-right: auto;

  :hover {
    color: black;
    background-color: lightblue;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.6);
  }
`;

let getScrollPosition = null;

const scrollPositionY = () => {
  getScrollPosition = window.pageYOffset;
  return getScrollPosition;
};

const scrollToBottom = () => {
  window.scrollTo({
    top: getScrollPosition,
  });
};

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

const HomePage = () => {
  const history = useHistory();
  const location = useLocation();
  const currentPage = new URLSearchParams(location.search).get('page') ?? 1;
  const [movieTrending, setMovieTrending] = useState([]);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchMovie() {
      const { PENDING, RESOLVED, NOTFOUND } = Status;
      setStatus(PENDING);
      await getTrending(page)
        .then(data => {
          if (!data.results.length) {
            setStatus(NOTFOUND);
            Toastify('warning', 'Sorry, there are no trending movies yet!');
          } else {
            setTotalPages(data.total_pages);
            setMovieTrending(movieTrending => [
              ...movieTrending,
              ...data.results,
            ]);
            setStatus(RESOLVED);
          }
        })
        .catch(error => {
          setStatus(NOTFOUND);
          Toastify('error', `${error}`);
        });
      if (page >= 2) scrollToBottom();
    }
    fetchMovie();
    if (page === 1) pushToHistory(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const pushToHistory = value =>
    history.push({ ...location, search: `page=${value}` });

  const getLoadMore = () => {
    scrollPositionY();
    setPage(prevState => Number(prevState) + 1);
    pushToHistory(Number(page) + 1);
  };

  return (
    <>
      {status === 'pending' && <LoadingLoader />}
      {status === 'resolved' && (
        <HomeWrapper>
          <HomeTitle>Trending today</HomeTitle>
          <HomeList>
            {movieTrending.map(element => (
              <MovieCard key={element.id} element={element} url="movies" />
            ))}
          </HomeList>
        </HomeWrapper>
      )}
      {movieTrending.length > 15 && page < totalPages && (
        <LoadMoreButton name={'Load more'} onClick={getLoadMore}>
          Load More
        </LoadMoreButton>
      )}
    </>
  );
};

export default HomePage;
