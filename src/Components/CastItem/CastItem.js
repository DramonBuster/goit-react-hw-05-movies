import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageNotAvailable from '../../images/notavailable.png';

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 350px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const CastDescription = styled.div`
  flex-grow: 1;
  padding: 10px 20px;
  color: #fff;
  line-height: 1.2;
  background-color: black;
`;

const CastTitle = styled.p`
  margin-bottom: 5px;
  font-size: 22px;
  text-align: center;
`;

const CastText = styled.p`
  font-size: 20px;
  :not(:last-child) {
    margin-bottom: 5px;
  }
`;

const CastTextHighlight = styled.span`
  color: lightblue;
`;

export default function CastItem({ element }) {
  return (
    <ListItem>
      <Wrapper>
        <Image
          src={
            element.profile_path
              ? `https://image.tmdb.org/t/p/w500${element.profile_path}`
              : ImageNotAvailable
          }
          alt={element.name ? element.name : element.original_name}
        />
      </Wrapper>
      <CastDescription>
        <CastTitle>
          {' '}
          {element.name ? element.name : element.original_name}
        </CastTitle>
        <CastText>
          Character: <CastTextHighlight>{element.character}</CastTextHighlight>
        </CastText>
        <CastText>
          Popularity:{' '}
          <CastTextHighlight>{element.popularity}</CastTextHighlight>
        </CastText>
      </CastDescription>
    </ListItem>
  );
}

CastItem.propTypes = {
  element: PropTypes.shape({
    profile_path: PropTypes.string,
    name: PropTypes.string,
    original_name: PropTypes.string,
    character: PropTypes.string,
    popularity: PropTypes.number,
  }),
};
