import React, { useState, useEffect } from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from '../../api';

const DetailContainer = (props) => {
  const {
    location: { pathname },
    match: {
      params: { id },
    },
    history: { push, goBack },
  } = props;

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMovie = pathname.includes('/movie/');
  const parsedId = parseInt(id);

  useEffect(() => {
    if (isNaN(parsedId)) {
      return push('/');
    }
    const fetchData = async () => {
      const { data } = isMovie
        ? await moviesApi.movieDetail(parsedId)
        : await tvApi.showDetail(parsedId);
      console.log(data);
      setResult(data);
    };

    try {
      fetchData();
    } catch {
      setError("Can't find any result.");
    } finally {
      setLoading(false);
    }
    return () => {
      setResult(null);
      setError(null);
      setLoading(true);
    };
  }, [isMovie, parsedId, push]);

  return result ? (
    <DetailPresenter
      result={result}
      error={error}
      loading={loading}
      goBack={goBack}
    />
  ) : null;
};

export default DetailContainer;

// export default class extends React.Component {
//   constructor(props) {
//     super(props);
//     const {
//       location: { pathname },
//     } = this.props;
//     this.state = {
//       result: null,
//       error: null,
//       loading: true,
//       isMovie: pathname.includes('/movie/'),
//     };
//   }

//   async componentDidMount() {
//     // console.log(this.props);
//     const {
//       match: {
//         params: { id },
//       },
//       history: { push },
//     } = this.props;
//     const { isMovie } = this.state;
//     const parsedId = parseInt(id);
//     if (isNaN(parsedId)) {
//       return push('/');
//     }
//     let result = null;
//     try {
//       if (isMovie) {
//         ({ data: result } = await moviesApi.movieDetail(parsedId));
//       } else {
//         ({ data: result } = await tvApi.showDetail(parsedId));
//       }
//     } catch {
//       this.setState({ error: "Can't find any result." });
//     } finally {
//       this.setState({ loading: false, result });
//     }
//   }

//   render() {
//     const { result, error, loading } = this.state;
//     const {
//       history: { goBack },
//     } = this.props;
//     console.log(result);
//     return (
//       <DetailPresenter
//         result={result}
//         error={error}
//         loading={loading}
//         goBack={goBack}
//       />
//     );
//   }
// }
