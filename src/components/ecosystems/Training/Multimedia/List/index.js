import React, { Component } from 'react';
import { Main } from './index.styles';
import MultimediaList from '../organisms/MultimediaList/MultimediaList';

class TrainingMultimediaWrapper extends Component {
  state = {
    empty: false,
    loading: true,
  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
  }

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  render() {
    return (
      <Main>
        <MultimediaList
          user={this.props.user}
          onLoadFinished={this.onLoadFinished}
          recommended={this.props.recommended}
        />
      </Main>
    );
  }
}

export default TrainingMultimediaWrapper;
