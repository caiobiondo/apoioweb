import React, { Component } from 'react';
import TrainingCategoriesDetails from './organisms/TrainingCategoriesDetails/TrainingCategoriesDetails';
import { Main } from './index.styles.js';

class TrainingCategoriesDetailsWrapper extends Component {
  state = {
    empty: false,
    loading: true,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  render() {
    const { id } = this.props.match.params;

    return (
      <Main>
        <TrainingCategoriesDetails
          user={this.props.user}
          categoryId={id}
          onLoadFinished={this.onLoadFinished}
        />
      </Main>
    );
  }
}

export default TrainingCategoriesDetailsWrapper;
