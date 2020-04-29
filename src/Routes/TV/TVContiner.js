import React, { useState, useEffect } from 'react';
import { tvApi } from '../../api';
import TVPresenter from './TVPresenter';

const TVContainer = () => {
  const [topRated, setTopRated] = useState(null);
  const [popular, setPopular] = useState(null);
  const [airingToday, setAiringToday] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();

      setTopRated(topRated);
      setPopular(popular);
      setAiringToday(airingToday);
    };

    try {
      fetchData();
    } catch {
      setError("Can't find TV information.");
    } finally {
      setLoading(false);
    }
    return () => {
      setTopRated(null);
      setPopular(null);
      setAiringToday(null);
      setError(null);
      setLoading(true);
    };
  }, []);
  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      error={error}
      loading={loading}
    />
  );
};

export default TVContainer;

// export default class extends React.Component {
//   state = {
//     topRated: null,
//     popular: null,
//     airingToday: null,
//     error: null,
//     loading: true,
//   };

//   async componentDidMount() {
//     try {
//       const {
//         data: { results: topRated },
//       } = await tvApi.topRated();
//       const {
//         data: { results: popular },
//       } = await tvApi.popular();
//       const {
//         data: { results: airingToday },
//       } = await tvApi.airingToday();

//       this.setState({ topRated, popular, airingToday });
//     } catch {
//       this.setState({ error: "Can't find TV information." });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   render() {
//     const { topRated, popular, airingToday, error, loading } = this.state;

//     return (
//       <TVPresenter
//         topRated={topRated}
//         popular={popular}
//         airingToday={airingToday}
//         error={error}
//         loading={loading}
//       />
//     );
//   }
// }
