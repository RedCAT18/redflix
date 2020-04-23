import React from 'react';
import CollectionPresenter from './CollectionPresenter';
import { moviesApi } from '../../api';

export default class CollectionContainer extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    const {
      match: {
        params: { id },
      },
    } = props;
    this.state = {
      id,
      loading: true,
      error: null,
      result: null,
    };
  }

  async componentDidMount() {
    const { id } = this.state;
    try {
      const { data } = await moviesApi.getCollection(id);
      this.setState({ result: data });
    } catch {
      this.state({
        error: "Sorry, can't find the information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    const {
      history: { goBack },
    } = this.props;
    return (
      <CollectionPresenter
        result={result}
        error={error}
        loading={loading}
        goBack={goBack}
      />
    );
  }
}
