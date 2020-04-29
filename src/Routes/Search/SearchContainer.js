import React, { useState } from 'react';
import { moviesApi, tvApi } from '../../api';
import SearchPresenter from './SearchPresenter';

const SearchContainer = () => {
  const [movieResults, setMovieResults] = useState(null);
  const [showResults, setShowResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm !== '') {
      searchByTerm(searchTerm);
    }
  };

  const updateTerm = (e) => {
    const {
      target: { value },
    } = e;
    setSearchTerm(value);
  };

  const searchByTerm = async () => {
    setLoading(true);
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: showResults },
      } = await tvApi.search(searchTerm);

      setMovieResults(movieResults);
      setShowResults(showResults);
    } catch {
      setError("Can't find result.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SearchPresenter
      movieResults={movieResults}
      showResults={showResults}
      searchTerm={searchTerm}
      error={error}
      loading={loading}
      handleSubmit={handleSubmit}
      updateTerm={updateTerm}
    />
  );
};

export default SearchContainer;

// export default class extends React.Component {
//   state = {
//     movieResults: null,
//     showResults: null,
//     searchTerm: '',
//     error: null,
//     loading: false,
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { searchTerm } = this.state;
//     if (searchTerm !== '') {
//       this.searchByTerm(searchTerm);
//     }
//   };

//   updateTerm = (e) => {
//     const {
//       target: { value },
//     } = e;
//     this.setState({ searchTerm: value });
//   };

//   searchByTerm = async () => {
//     const { searchTerm } = this.state;
//     this.setState({ loading: true });
//     try {
//       const {
//         data: { results: movieResults },
//       } = await moviesApi.search(searchTerm);
//       const {
//         data: { results: showResults },
//       } = await tvApi.search(searchTerm);

//       this.setState({ movieResults, showResults });
//     } catch {
//       this.setState({ error: "Can't find result." });
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   render() {
//     const {
//       movieResults,
//       showResults,
//       searchTerm,
//       error,
//       loading,
//     } = this.state;
//     console.log(this.state);
//     return (
//       <SearchPresenter
//         movieResults={movieResults}
//         showResults={showResults}
//         searchTerm={searchTerm}
//         error={error}
//         loading={loading}
//         handleSubmit={this.handleSubmit}
//         updateTerm={this.updateTerm}
//       />
//     );
//   }
// }
