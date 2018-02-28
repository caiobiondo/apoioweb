import React, { Component } from 'react';
import TrainingMyList from './organisms/TrainingMyList';
import { Main } from './index.styles';

class TrainingWrapper extends Component {
  state = {
    empty: false,
    loading: true,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  render() {
    return (
      <Main>
        <TrainingMyList
          user={this.props.user}
          favorite={true}
          onLoadFinished={this.onLoadFinished}
        />
      </Main>
    );
  }
}

export default TrainingWrapper;
