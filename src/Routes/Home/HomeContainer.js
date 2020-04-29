import React, { useState, useEffect } from 'react';
import { moviesApi } from '../../api';
import HomePresenter from './HomePresenter';

const HomeContainer = () => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [popular, setPopular] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();

      setNowPlaying(nowPlaying);
      setUpcoming(upcoming);
      setPopular(popular);
    };

    try {
      fetchData();
    } catch {
      setError("Can't find movies' information.");
    } finally {
      setLoading(false);
    }

    return () => {
      setNowPlaying(null);
      setUpcoming(null);
      setPopular(null);
      setError(null);
      setLoading(true);
    };
  }, []);

  return (
    <HomePresenter
      nowPlaying={nowPlaying}
      upcoming={upcoming}
      popular={popular}
      error={error}
      loading={loading}
    />
  );
};

export default HomeContainer;

// export default class extends React.Component {
//   state = {
//     nowPlaying: null,
//     upcoming: null,
//     popular: null,
//     error: null,
//     loading: true,
//   };

//   async componentDidMount() {
//     try {
//       const {
//         data: { results: nowPlaying },
//       } = await moviesApi.nowPlaying();
//       const {
//         data: { results: upcoming },
//       } = await moviesApi.upcoming();
//       const {
//         data: { results: popular },
//       } = await moviesApi.popular();

//       this.setState({ nowPlaying, upcoming, popular });
//     } catch {
//       this.setState({ error: "Can't find movies' information." });
//     } finally {
//       this.setState({
//         loading: false,
//       });
//     }
//   }

//   render() {
//     const { nowPlaying, upcoming, popular, error, loading } = this.state;

//     return (
//       <HomePresenter
//         nowPlaying={nowPlaying}
//         upcoming={upcoming}
//         popular={popular}
//         error={error}
//         loading={loading}
//       />
//     );
//   }
// }
