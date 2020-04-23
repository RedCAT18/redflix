import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import Message from 'Components/Message';
import Loader from 'Components/Loader';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 40%;
  background-image: url(${(props) => props.bgImg});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 60%;
  margin-left: 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
  width: 75%;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.8;
  line-height: 1.5;
  width: 70%;
`;

const Video = styled.p`
  margin-bottom: 5px;
  &:hover {
    opacity: 0.7;
  }
`;

const SeasonTitle = styled.h3`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Season = styled.p`
  margin: 3px;
`;

const Backward = styled.div`
  position: absolute;
  top: 0;
  right: 5vw;
  padding: 5px;
  cursor: pointer;
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

const DetailPresenter = ({ result, error, loading, goBack }) => {
  const handleClick = () => {
    return goBack();
  };
  // console.log(result.runtime);
  return loading ? (
    <>
      <Helmet>
        <title>Loading | RedFlix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message text={error} color="#e74c3c" />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result?.original_title
            ? result.original_title
            : result.original_name}{' '}
          | RedFlix
        </title>
      </Helmet>
      <Backdrop
        bgImg={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      ></Backdrop>
      <Content>
        <Cover
          bgImg={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPosterBig.png')
          }
        />
        <Data>
          <Title>
            {result?.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result?.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>▪</Divider>
            <Item>
              {result?.runtime && result.runtime !== null
                ? result.runtime
                  ? result.runtime
                  : result.episode_run_time[0]
                : 'Unknown'}{' '}
              min
            </Item>
            <Divider>▪</Divider>
            <Item>
              {result?.genres &&
                result.genres.map((genre, idx) =>
                  idx === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>▪</Divider>
            <Item>
              {result?.origin_country
                ? result.origin_country.map((cntr, idx) =>
                    idx === result.origin_country.length - 1
                      ? cntr
                      : `${cntr} /`
                  )
                : null}
              {result?.production_countries
                ? result.production_countries.map((cntr, idx) =>
                    idx === result.production_countries.length - 1
                      ? cntr.iso_3166_1
                      : `${cntr.iso_3166_1} /`
                  )
                : null}
            </Item>
            <Item>
              {result?.homepage ? (
                <>
                  <Divider>▪</Divider>
                  <a
                    href={result.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span role="img" aria-label="Homepage">
                      🏠
                    </span>
                  </a>
                </>
              ) : null}
            </Item>
            <Item>
              {result?.imdb_id ? (
                <>
                  <Divider>▪</Divider>
                  <a
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span role="img" aria-label="IMDB">
                      🗃️
                    </span>
                  </a>
                </>
              ) : null}
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Languages :{' '}
              {result?.spoken_languages
                ? result.spoken_languages.map((lang) => `${lang.name} `)
                : result.languages.map((lang) => `${lang} `)}
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Production:{' '}
              {result?.production_companies
                ? result.production_companies.map((com, idx) =>
                    idx === result.production_companies.length - 1
                      ? `${com.name}(${com.origin_country || ' - '})`
                      : `${com.name}(${com.origin_country || ' - '}) | `
                  )
                : null}
            </Item>
          </ItemContainer>
          <Overview>{result?.overview}</Overview>
          {result?.videos ? (
            <ItemContainer>
              {result.videos.results.map((result) => (
                <Video key={result.id}>
                  <a
                    href={`https://www.youtube.com/watch?v=${result.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span role="img" aria-label="Videos">
                      📺
                    </span>{' '}
                    {result.name}
                  </a>
                </Video>
              ))}
            </ItemContainer>
          ) : null}
          {result?.seasons ? (
            <ItemContainer>
              <SeasonTitle>Seasons</SeasonTitle>
              {result.seasons.map((season) => (
                <Link
                  to={{
                    pathname: `${result.id}/season/${season.season_number}`,
                    state: { name: result.original_name },
                  }}
                  key={season.id}
                >
                  <Season>
                    {season.name} ({season.episode_count} episodes)
                  </Season>
                </Link>
              ))}
            </ItemContainer>
          ) : null}
          {result?.belongs_to_collection ? (
            <Link to={`/collection/${result.belongs_to_collection.id}/`}>
              <span role="img" aria-label="collection">
                ▶️{' '}
              </span>
              {result.belongs_to_collection.name}
            </Link>
          ) : null}
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

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default DetailPresenter;
