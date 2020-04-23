import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Section from 'Components/Section';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import Poster from 'Components/Poster';

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 24px;
  width: 100%;
  padding: 3px 0;
  border: 2px solid rgba(255, 255, 255, 0.5);
`;

const SearchPresenter = ({
  movieResults,
  showResults,
  searchTerm,
  error,
  loading,
  handleSubmit,
  updateTerm,
}) => (
  <Container>
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Search Movies or TV Shows..."
        value={searchTerm}
        onChange={updateTerm}
      />
    </Form>
    {loading ? (
      <>
        <Helmet>
          <title>Loading | RedFlix</title>
        </Helmet>
        <Loader />
      </>
    ) : (
      <>
        <Helmet>
          <title>
            {movieResults || showResults
              ? `Result for "${searchTerm}"`
              : 'Search'}{' '}
            | RedFlix
          </title>
        </Helmet>
        {movieResults?.length > 0 && (
          <Section title="Movie Results">
            {movieResults.map((movie) => (
              <Poster
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                imageUrl={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date?.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}
        {showResults?.length > 0 && (
          <Section title="TV Show Results">
            {showResults.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                title={show.original_name}
                imageUrl={show.poster_path}
                rating={show.vote_average}
                year={show.first_air_date?.substring(0, 4)}
                isMovie={false}
              />
            ))}
          </Section>
        )}
      </>
    )}
    {error && <Message color="#e74c3c" text={error} />}
    {movieResults &&
      showResults &&
      movieResults.length === 0 &&
      showResults.length === 0 && (
        <Message text="Oops, Nothing found :/" color="#95a5a6" />
      )}
  </Container>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  showResults: PropTypes.array,
  searchTerm: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
