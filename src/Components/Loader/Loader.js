import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export default function LoadingLoader() {
  return (
    <LoaderWrapper>
      <Loader type="Circles" color="#00BFFF" height={300} width={300} />;
    </LoaderWrapper>
  );
}
