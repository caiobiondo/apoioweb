import React, { Component } from 'react';
import TrainingCategoriesList from './organisms/TrainingCategoriesList/TrainingCategoriesList';
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
        <TrainingCategoriesList
          user={this.props.user}
          onLoadFinished={this.onLoadFinished}
          productSearch={this.state.productSearch}
        />
      </Main>
    );
  }
}

export default TrainingWrapper;
