import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Loader from 'Components/Loader';
import Message from 'Components/Message';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-position: center center;
  background-size: cover;
  filter: blur(4px);
  opacity: 0.5;
  z-index: -1;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Image = styled.div`
  width: 35%;
  background-image: url(${(props) => props.bgImg});
  background-position: center center;
  background-size: cover;
  height: 100%;
  min-height: 600px;
  border-radius: 5px;
  @media only screen and (max-width: 800px) {
    width: 100%;
    margin-bottom: 20px;
    min-width: 0;
  }
`;

const Data = styled.div`
  width: 65%;
  margin-left: 20px;
  @media only screen and (max-width: 800px) {
    width: 100%;
    margin-bottom: 20px;
    margin-left: 0;
  }
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Collection = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemContainer = styled.div`
  width: 70%;
  margin-bottom: 10px;
  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Item = styled.p`
  line-height: 1.3;
  opacity: 0.8;
`;

const Thumbnail = styled.div`
  width: 120px;
  height: 180px;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  border-radius: 3px;
  margin: 10px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 5px;
  @media only screen and (max-width: 800px) {
    margin-top: 5px;
  }
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

const CollectionPresenter = ({ result, error, loading, goBack }) => {
  const handleClick = () => {
    return goBack();
  };
  console.log(result);
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>{result?.name} | RedFlix</title>
      </Helmet>
      <Backdrop
        bgImg={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      ></Backdrop>
      <Content>
        <Image
          bgImg={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPosterBig.png')
          }
        ></Image>
        <Data>
          <Title>{result?.name}</Title>
          <ItemContainer>
            <Item>{result?.overview}</Item>
          </ItemContainer>

          {result?.parts
            ? result.parts.map((part) => (
                <Collection key={part.id}>
                  <Thumbnail
                    bgImg={
                      part.poster_path
                        ? `https://image.tmdb.org/t/p/original${part.poster_path}`
                        : require('../../assets/noPosterSmall.png')
                    }
                  />
                  <ItemContainer>
                    <SubTitle>
                      <Link to={`/movie/${part.id}`}>
                        {part.original_title}
                      </Link>{' '}
                      ({part.release_date.substring(0, 4) || ' - '})
                    </SubTitle>
                    <Item>{part.overview}</Item>
                  </ItemContainer>
                </Collection>
              ))
            : null}

          <Backward onClick={handleClick}>
            <span role="img" aria-label="Arrow">
              ◀️
            </span>{' '}
            Go Previous Page
          </Backward>
        </Data>
      </Content>
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );
};

CollectionPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default CollectionPresenter;
