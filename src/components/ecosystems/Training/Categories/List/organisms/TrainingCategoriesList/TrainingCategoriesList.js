import React, { Component } from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { Loading, Paper, CircularProgress } from 'natura-ui';
import {
  TrainingCategoriesQuery,
  TrainingCategoriesQueryOptions,
} from './TrainingCategoriesList.data';
import { graphql } from 'react-apollo';

import Category from 'components/ecosystems/Training/Categories/List/molecules/Category';

import InfiniteScroll from 'react-infinite-scroller';

import { fullContainer, List, LoadingWrapper } from './TrainingCategoriesList.styles';

const renderTrainingCategory = trainingCategory => {
  return (
    <li key={trainingCategory.id}>
      <Category category={trainingCategory} />
    </li>
  );
};

const renderEmptyList = (
  <Paper style={fullContainer}>
    <EmptyList
      icon="ico_list_add"
      titleId="trainingCategoriesEmptyList"
      descriptionId="trainingCategoriesEmptyListDescription"
    />
  </Paper>
);

export class TrainingCategoriesList extends Component {
  state = {
    hasMoreItems: true,
  };

  componentWillReceiveProps({ loading, trainingCategories }) {
    this.notifyLoadFinish(loading, trainingCategories);
    this.checkIfHasMoreItems(loading, trainingCategories);
  }

  notifyLoadFinish = (loading, items) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(this.isEmpty(loading, items), this.isLoading(loading, items));
    }
  };

  checkIfHasMoreItems = (loading, items) => {
    if (this.props.loading === loading || !items) {
      return;
    }

    const hasMoreItems =
      (items && !this.props.trainingCategories) ||
      items.length !== this.props.trainingCategories.length;
    this.setState({ hasMoreItems });
  };

  isLoading = (loading, items) => {
    return loading && !items;
  };

  isEmpty = (loading, items) => {
    return !loading && (!items || items.length === 0);
  };

  render() {
    const { fetchMore, loading, trainingCategories } = this.props;

    if (!trainingCategories && loading) {
      return <Loading background="transparent" />;
    }

    if (!trainingCategories || !trainingCategories.length) {
      return renderEmptyList;
    }

    return (
      <Paper style={fullContainer}>
        <InfiniteScroll
          loadMore={fetchMore}
          hasMore={false}
          loader={
            <LoadingWrapper>
              <CircularProgress thickness={2} />
            </LoadingWrapper>
          }
        >
          <List>{trainingCategories.map(category => renderTrainingCategory(category))}</List>
        </InfiniteScroll>
      </Paper>
    );
  }
}

export default graphql(TrainingCategoriesQuery, TrainingCategoriesQueryOptions)(
  TrainingCategoriesList,
);
