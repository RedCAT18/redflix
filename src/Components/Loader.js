import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 30px;
  margin-top: 20px;
  img {
    transform: translateY(-5vh);
  }
`;

const Loader = () => (
  <Container>
    <img src={require('../assets/loading.svg')} alt="loading" />
  </Container>
);

export default Loader;
