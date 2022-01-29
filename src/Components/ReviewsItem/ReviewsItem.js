import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageNotAvailable from '../../images/notavailable.png';

const ReviewsListItem = styled.li`
  display: flex;
  border: 1px solid black;
  background-color: white;

  :not(:last-child) {
    margin-bottom: 20px;
    padding-bottom: 5px;
  }
`;

const ReviewsWrapper = styled.div`
  margin-right: 30px;
  border-right: 1px solid black;
  padding: 5px;
  background-color: lightblue;
`;

const ReviewsWrapperImg = styled.div`
  margin-bottom: 10px;
  width: 100px;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
`;

const ReviewsImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ReviewsTitle = styled.p`
  text-align: center;
  font-size: 22px;
  font-weight: 700;
`;

const ReviewsText = styled.p`
  font-size: 18px;
  padding: 10px;
`;

export default function ReviewsItem({ element }) {
  return (
    <ReviewsListItem>
      <ReviewsWrapper>
        <ReviewsWrapperImg>
          <ReviewsImg
            src={
              !element.author_details.avatar_path
                ? ImageNotAvailable
                : (element.author_details.avatar_path.includes('/https:') &&
                    element.author_details.avatar_path.slice(1)) ||
                  `https://secure.gravatar.com/avatar${element.author_details.avatar_path}`
            }
            alt={element.author}
          />
        </ReviewsWrapperImg>
        <ReviewsTitle> {element.author}</ReviewsTitle>
      </ReviewsWrapper>
      <ReviewsText> {element.content}</ReviewsText>
    </ReviewsListItem>
  );
}

ReviewsItem.propTypes = {
  element: PropTypes.shape({
    author_details: PropTypes.shape({
      avatar_path: PropTypes.string,
    }),
    author: PropTypes.string,
    content: PropTypes.string,
  }),
};
