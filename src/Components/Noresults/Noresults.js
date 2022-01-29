import noResults from '../../images/noresults.png';
import styled from 'styled-components';

const NoResultsWrapper = styled.div``;

const NoResultsImage = styled.img`
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  padding-top: 20px;
`;

export default function NoResults() {
  return (
    <NoResultsWrapper>
      <NoResultsImage src={noResults} alt="No Results" />
    </NoResultsWrapper>
  );
}
