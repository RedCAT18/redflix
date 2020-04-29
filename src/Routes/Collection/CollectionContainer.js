import React, { useState, useEffect } from 'react';
import CollectionPresenter from './CollectionPresenter';
import { moviesApi } from '../../api';

const CollectionContainer = (props) => {
  const {
    match: {
      params: { id },
    },
    history: { goBack },
  } = props;

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await moviesApi.getCollection(id);

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
  }, [id]);

  return result ? (
    <CollectionPresenter
      result={result}
      error={error}
      loading={loading}
      goBack={goBack}
    />
  ) : null;
};
export default CollectionContainer;

// export default class CollectionContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     // console.log(props);
//     const {
//       match: {
//         params: { id },
//       },
//     } = props;
//     this.state = {
//       id,
//       loading: true,
//       error: null,
//       result: null,
//     };
//   }

//   async componentDidMount() {
//     const { id } = this.state;
//     try {
//       const { data } = await moviesApi.getCollection(id);
//       this.setState({ result: data });
//     } catch {
//       this.state({
//         error: "Sorry, can't find the information.",
//       });
//     } finally {
//       this.setState({
//         loading: false,
//       });
//     }
//   }

//   render() {
//     const { result, error, loading } = this.state;
//     const {
//       history: { goBack },
//     } = this.props;
//     return (
//       <CollectionPresenter
//         result={result}
//         error={error}
//         loading={loading}
//         goBack={goBack}
//       />
//     );
//   }
// }
