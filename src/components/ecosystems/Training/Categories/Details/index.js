import React, { Component } from 'react';
import TrainingCategoriesDetails from './organisms/TrainingCategoriesDetails/TrainingCategoriesDetails';

class TrainingCategoriesDetailsWrapper extends Component {
  state = {
    empty: false,
    loading: true,
  };

  onLoadFinished = (empty, loading) => {
    console.log(empty, loading);
    this.setState({ empty: empty, loading: loading });
  };

  render() {
    const { id } = this.props.match.params;

    return (
      <TrainingCategoriesDetails
        user={this.props.user}
        categoryId={id}
        onLoadFinished={this.onLoadFinished}
      />
    );
  }
}

export default TrainingCategoriesDetailsWrapper;
