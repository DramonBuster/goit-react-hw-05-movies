import { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getMovie } from '../../movies-api/movies-api';
import Loading from '../../Components/Loader/Loader';
import MovieCard from '../../Components/MovieCard/MovieCard';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Toastify from '../../Components/Toastify/Toastify';
import NoResults from '../../Components/Noresults/Noresults';
// import Button from '';

const MovieWrapper = styled.div`
  padding: 20px 150px;
`;

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
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
  NORESULTS: 'noResults',
};

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const currentSearchQuery =
    new URLSearchParams(location.search).get('query') ?? '';
  const currentPage = new URLSearchParams(location.search).get('page') ?? 1;
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState(currentSearchQuery);
  const [page, setPage] = useState(currentPage);
  const [totalPages, setTotalPages] = useState(0);
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!searchQuery) return;
    const { PENDING, RESOLVED, NORESULTS } = Status;
    setStatus(PENDING);
    async function fetchMovie() {
      await getMovie(searchQuery, page)
        .then(data => {
          if (!data.results.length) {
            setStatus(NORESULTS);
            Toastify('warning', 'Sorry, there are no movies!');
          } else {
            setTotalPages(data.total_pages);
            setMovie(movieTrending => [...movieTrending, ...data.results]);
            setStatus(RESOLVED);
          }
        })
        .catch(error => {
          setStatus(NORESULTS);
          Toastify('error', `${error}`);
        });
      if (page >= 2) scrollToBottom();
    }
    fetchMovie();
    if (page === 1) pushToHistory(searchQuery, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

  const pushToHistory = (query, value) =>
    history.push({
      ...location,
      search: `query=${query}&page=${value}`,
    });

  const handleFormSubmit = query => {
    if (query !== searchQuery) {
      setMovie([]);
      setSearchQuery(query);
      setPage(1);
    }
  };

  const getLoadMore = () => {
    scrollPositionY();
    setPage(prevState => Number(prevState) + 1);
    pushToHistory(searchQuery, Number(page) + 1);
  };

  return (
    <>
      {status === 'pending' && <Loading />}
      <MovieWrapper>
        <SearchBar onSubmit={handleFormSubmit} />
        {status === 'noResults' && <NoResults />}
        {status === 'resolved' && (
          <MovieList>
            {movie.map(element => (
              <MovieCard key={element.id} element={element} url={url} />
            ))}
          </MovieList>
        )}
      </MovieWrapper>
      {/* {movie.length > 15 && page < totalPages && (
        <Button
          name={'Load more'}
          nameClass="load-button"
          onClick={getLoadMore}
        />
      )} */}
      {/* {movie.length > 15 && (
        <Button name={'To UP'} nameClass="up-button" onClick={scrollTop} />
      )} */}
    </>
  );
}
