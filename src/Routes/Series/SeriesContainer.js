import React from 'react';
import SeriesPresenter from './SeriesPresenter';
import { tvApi } from '../../api';

export default class SeriesContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    const {
      match: { params },
      location: {
        state: { name },
      },
    } = this.props;

    this.state = {
      id: params.id,
      name,
      season: params.season,
      result: null,
      error: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const { id, season } = this.state;
    try {
      const { data } = await tvApi.getSeries(id, season);

      this.setState({ result: data });
    } catch {
      this.setState({ error: "Sorry, can't find the information." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    // console.log(this.state.result);
    const {
      history: { goBack },
    } = this.props;
    const { name, result, error, loading } = this.state;
    return (
      <SeriesPresenter
        name={name}
        result={result}
        error={error}
        loading={loading}
        goBack={goBack}
      />
    );
  }
}
