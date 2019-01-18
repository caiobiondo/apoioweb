import React, { Component } from 'react';
import { Main } from './index.styles';
import MultimediaList from '../organisms/MultimediaList/MultimediaList';

class TrainingMultimediaWrapper extends Component {
  state = {
    empty: false,
    loading: true,
    courseFilter: '',
    status: '',
  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    // const name = params.get('filter');

    // if (name) {
    //   this.onSearch({ name: name });
    // }
  }

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  // onSearch = filter => {
  //   this.setState({
  //     filter: filter.name,
  //     loading: true,
  //     empty: false,
  //   });
  // };

  render() {
    return (
      <Main>
        <MultimediaList user={this.props.user} onLoadFinished={this.onLoadFinished} />
      </Main>
    );
  }
}

export default TrainingMultimediaWrapper;
