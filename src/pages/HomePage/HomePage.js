import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MovieCard from '../../Components/MovieCard/MovieCard';
import Toastify from '../../Components/Toastify/Toastify';
import LoadingLoader from '../../Components/Loader/Loader';
import { getTrending } from '../../movies-api/movies-api';
// import Button from 'components/Button';

const HomeWrapper = styled.div`
  padding: 20px 150px;
`;

const HomeTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #fff;
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

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
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
      {/* {movieTrending.length > 15 && page < totalPages && (
        <Button
          name={'Load more'}
          nameClass="load-button"
          onClick={getLoadMore}
        />
      )} */}
      {/* {movieTrending.length > 15 && (
        <Button name={'To UP'} nameClass="up-button" onClick={scrollToTop} />
      )} */}
    </>
  );
};

export default HomePage;
