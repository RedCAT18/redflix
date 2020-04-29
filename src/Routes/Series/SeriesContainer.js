import React, { useState, useEffect } from 'react';
import SeriesPresenter from './SeriesPresenter';
import { tvApi } from '../../api';

const SeriesContainer = (props) => {
  const {
    match: {
      params: { id, season },
    },
    location: {
      state: { name },
    },
    history: { goBack },
  } = props;
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await tvApi.getSeries(id, season);
      setResult(data);
    };
    try {
      fetchData();
    } catch {
      setError("Sorry, can't find the information.");
    } finally {
      setLoading(false);
    }
    return () => {
      setResult(null);
      setError(null);
      setLoading(true);
    };
  }, [id, season]);

  return result ? (
    <SeriesPresenter
      name={name}
      result={result}
      error={error}
      loading={loading}
      goBack={goBack}
    />
  ) : null;
};

export default SeriesContainer;

// export default class SeriesContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log(props);
//     const {
//       match: { params },
//       location: {
//         state: { name },
//       },
//     } = this.props;

//     this.state = {
//       id: params.id,
//       name,
//       season: params.season,
//       result: null,
//       error: null,
//       loading: true,
//     };
//   }

//   async componentDidMount() {
//     const { id, season } = this.state;
//     try {
//       const { data } = await tvApi.getSeries(id, season);

//       this.setState({ result: data });
//     } catch {
//       this.setState({ error: "Sorry, can't find the information." });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   render() {
//     // console.log(this.state.result);
//     const {
//       history: { goBack },
//     } = this.props;
//     const { name, result, error, loading } = this.state;
//     return (
//       <SeriesPresenter
//         name={name}
//         result={result}
//         error={error}
//         loading={loading}
//         goBack={goBack}
//       />
//     );
//   }
// }
