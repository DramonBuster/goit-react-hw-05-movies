import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getCredits } from '../../movies-api/movies-api';
import toastify from '../Toastify/Toastify';
import LoadingLoader from '../Loader/Loader';
import CastItem from '../CastItem/CastItem';

const NotFound = styled.p`
  padding-left: 200px;
  font-size: 24px;
  font-weight: 700;
`;

const CastList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 18px;
  padding-left: 150px;
  padding-right: 150px;
`;

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const { PENDING, RESOLVED, NOTFOUND } = Status;
    setStatus(PENDING);
    getCredits(movieId)
      .then(data => {
        if (!data.cast.length) {
          setStatus(NOTFOUND);
          toastify('warning', 'There are no reviews for this movie yet.');
        } else {
          setCast(data.cast);
          setStatus(RESOLVED);
        }
      })
      .catch(error => {
        setStatus(NOTFOUND);
        toastify('error', `${error}`);
      });
  }, [movieId]);

  return (
    <>
      {status === 'pending' && <LoadingLoader />}
      {status === 'notFound' && (
        <NotFound>There are no reviews for this movie yet.</NotFound>
      )}
      {status === 'resolved' && (
        <CastList>
          {cast.map(element => (
            <CastItem key={element.id} element={element} />
          ))}
        </CastList>
      )}
    </>
  );
}

Cast.propTypes = {
  movieId: PropTypes.number.isRequired,
};
