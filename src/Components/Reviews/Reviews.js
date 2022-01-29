import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getReviews } from '../../movies-api/movies-api';
import LoadingLoader from '../Loader/Loader';
import Toastify from '../Toastify/Toastify';
import ReviewsItem from '../ReviewsItem/ReviewsItem';

const ReviewsTitle = styled.p`
  padding-left: 200px;
  font-size: 24px;
  font-weight: 700;
`;

const ReviewsList = styled.ul`
  padding-left: 150px;
  padding-right: 150px;
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

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchReviews() {
      const { PENDING, RESOLVED, NOTFOUND } = Status;
      setStatus(PENDING);
      await getReviews(movieId, page)
        .then(data => {
          if (!data.results.length) {
            setStatus(NOTFOUND);
            Toastify('warning', "We don't have any reviews for this movie!");
          } else {
            setTotalPages(data.total_pages);
            setReviews(reviews => [...reviews, ...data.results]);
            setStatus(RESOLVED);
          }
        })
        .catch(error => {
          setStatus(NOTFOUND);
          Toastify('error', `${error}`);
        });
      if (page >= 2) scrollToBottom();
    }
    fetchReviews();
  }, [movieId, page]);

  const getLoadMore = () => {
    scrollPositionY();
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      {status === 'pending' && <LoadingLoader />}
      {status === 'notFound' && (
        <ReviewsTitle>We don't have any reviews for this movie!</ReviewsTitle>
      )}
      {status === 'resolved' && (
        <ReviewsList>
          {reviews.map(element => (
            <ReviewsItem key={element.id} element={element} />
          ))}
        </ReviewsList>
      )}
      {reviews.length > 15 && page < totalPages && (
        <LoadMoreButton onClick={getLoadMore}>Load More</LoadMoreButton>
      )}
    </>
  );
}
