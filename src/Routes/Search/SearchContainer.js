import React from 'react';
import { moviesApi, tvApi } from '../../api';
import SearchPresenter from './SearchPresenter';

export default class extends React.Component {
  state = {
    movieResults: null,
    showResults: null,
    searchTerm: '',
    error: null,
    loading: false,
  };

  handleSubmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== '') {
      this.searchByTerm(searchTerm);
    }
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: showResults },
      } = await tvApi.search(searchTerm);
      this.setState({ movieResults, showResults });
    } catch {
      this.setState({ error: "Can't find result." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      movieResults,
      showResults,
      searchTerm,
      error,
      loading,
    } = this.state;
    console.log(this.state);
    return (
      <SearchPresenter
        movieResults={movieResults}
        showResults={showResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
