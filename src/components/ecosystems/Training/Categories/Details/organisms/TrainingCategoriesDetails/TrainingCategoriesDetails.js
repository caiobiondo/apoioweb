import React, { Component } from 'react';
import { Loading, Paper } from 'natura-ui';
import {
  TrainingCategoriesDetailsQuery,
  TrainingCategoriesDetailsOptions,
} from './TrainingCategoriesDetails.data';
import { graphql } from 'react-apollo';

import {
  fullContainer,
  Header,
  BackButtonWrapper,
  BackButton,
  BackButtonIcon,
  CategoryPercentageWrapper,
  CategoryPercentageLabel,
  CategoryPercentageBar,
  Banner,
  BannerContent,
} from './TrainingCategoriesDetails.styles';

export class TrainingCategoriesDetails extends Component {
  state = {};

  componentWillReceiveProps({ loading, trainingCourses }) {
    console.log(loading, trainingCourses);
    this.notifyLoadFinish(loading, trainingCourses);
  }

  notifyLoadFinish = (loading, items) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(this.isEmpty(loading, items), this.isLoading(loading, items));
    }
  };

  isLoading = (loading, items) => {
    return loading && !items;
  };

  isEmpty = (loading, items) => {
    return !loading && (!items || items.length === 0);
  };

  render() {
    const { loading, trainingCourses, trainingCategory } = this.props;

    if (this.isLoading(loading, trainingCourses)) {
      return <Loading background="transparent" />;
    }

    return (
      <Paper style={fullContainer}>
        <span>teste</span>
      </Paper>
    );
  }
}

export default graphql(TrainingCategoriesDetailsQuery, TrainingCategoriesDetailsOptions)(
  TrainingCategoriesDetails,
);
