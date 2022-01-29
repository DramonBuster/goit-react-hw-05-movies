import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ImageNotAvailable from '../../images/notavailable.png';

const MovieItem = styled.li`
  border: 1px solid #18819e;
  border-radius: 5px;
  overflow: hidden;

  :hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.6);
  }
`;

const MovieWrapper = styled.div`
  width: 100%;
  height: 420px;
`;

const MovieImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const MovieDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 82px;
  padding: 5px 10px;
  font-size: 20px;
  color: white;
  line-height: 1.2;
  background-color: black;
`;

const MovieTitle = styled.p`
  padding-right: 10px;
`;

const MovieRating = styled.p`
  min-width: 35px;
  padding: 5px 0;
  text-align: center;
  background-color: green;
  border-radius: 50%;
`;

export default function MovieCard({ element, url }) {
  const location = useLocation();

  return (
    <MovieItem>
      <Link
        to={{
          pathname: `${url}/${element.id}`,
          state: { from: location },
        }}
      >
        <MovieWrapper>
          <MovieImage
            src={
              element.poster_path
                ? `https://image.tmdb.org/t/p/w500${element.poster_path}`
                : ImageNotAvailable
            }
            alt={
              element.title || element.original_title
                ? element.title || element.original_title
                : element.name || element.original_name
            }
          />
        </MovieWrapper>
        <MovieDescription>
          <MovieTitle>
            {element.title || element.original_title
              ? element.title || element.original_title
              : element.name || element.original_name}
          </MovieTitle>
          <MovieRating> {element.vote_average}</MovieRating>
        </MovieDescription>
      </Link>
    </MovieItem>
  );
}

MovieCard.propTypes = {
  element: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    original_title: PropTypes.string,
    name: PropTypes.string,
    original_name: PropTypes.string,
    vote_average: PropTypes.number,
  }),
  url: PropTypes.string.isRequired,
};
