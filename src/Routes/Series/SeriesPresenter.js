import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Message from 'Components/Message';
import Loader from 'Components/Loader';

const Container = styled.div`
  padding: 20px;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Content = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: row;
  height: 100%;
  position: relative;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Image = styled.div`
  width: 35%;
  background-image: url(${(props) => props.bgImage});
  height: 100%;
  min-height: 600px;
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  @media only screen and (max-width: 800px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const Data = styled.div`
  width: 65%;
  margin-left: 20px;
  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

const ItemContainer = styled.div`
  padding: 5px;
  width: 80%;
`;

const Item = styled.p`
  padding: 3px;
  margin-bottom: 3px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 5px;
`;

const Backward = styled.div`
  position: absolute;
  top: -25px;
  right: 5vw;
  padding: 5px;
  cursor: pointer;
  @media only screen and (max-width: 800px) {
    top: -30px;
    right: 0;
  }
`;

const SeriesPresenter = ({ name, result, error, loading, goBack }) => {
  console.log(result);
  const handleClick = () => {
    return goBack();
  };
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>
          {name} {result?.name} | RedFlix
        </title>
      </Helmet>
      <Content>
        <Image
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPosterBig.png')
          }
        ></Image>
        <Data>
          <Title>{name}</Title>
          <ItemContainer>
            <SubTitle>
              {result.name} ({result?.air_date.substring(0, 4) || ' - '})
            </SubTitle>
          </ItemContainer>
          <ItemContainer>
            {result?.episodes.map((ep) => (
              <Item key={ep.id}>
                {ep.episode_number}: {ep.name}(
                {ep?.air_date?.substring(0, 4) || ' - '})
              </Item>
            ))}
          </ItemContainer>
        </Data>
        <Backward onClick={handleClick}>
          <span role="img" aria-label="Arrow">
            ◀️
          </span>{' '}
          Go Previous Page
        </Backward>
      </Content>
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );
};

SeriesPresenter.propTypes = {
  name: PropTypes.string,
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default SeriesPresenter;
