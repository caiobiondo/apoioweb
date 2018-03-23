import React, { Component } from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { Loading, Paper } from 'natura-ui';
import {
  TrainingCategoriesQuery,
  TrainingCategoriesQueryOptions,
} from './TrainingCategoriesList.data';
import { graphql } from 'react-apollo';
import PageMenu from 'components/ecosystems/Training/atoms/PageMenu/PageMenu';

import Category from 'components/ecosystems/Training/Categories/List/molecules/Category';

import { fullContainer, List, ListItem } from './TrainingCategoriesList.styles';

const renderTrainingCategory = trainingCategory => {
  return (
    <ListItem key={trainingCategory.id}>
      <Category category={trainingCategory} />
    </ListItem>
  );
};

const renderEmptyList = (
  <Paper style={fullContainer}>
    <PageMenu />
    <EmptyList
      icon="ico_list_add"
      titleId="trainingCategoriesEmptyList"
      descriptionId="trainingCategoriesEmptyListDescription"
    />
  </Paper>
);

export class TrainingCategoriesList extends Component {
  state = {};

  componentWillReceiveProps({ loading, trainingCategories }) {
    this.notifyLoadFinish(loading, trainingCategories);
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
    const { loading, trainingCategories } = this.props;

    if (!trainingCategories && loading) {
      return <Loading background="transparent" />;
    }

    if (!trainingCategories || !trainingCategories.length) {
      return renderEmptyList;
    }

    return (
      <Paper style={fullContainer}>
        <PageMenu />
        <List>{trainingCategories.map(category => renderTrainingCategory(category))}</List>
      </Paper>
    );
  }
}

export default graphql(TrainingCategoriesQuery, TrainingCategoriesQueryOptions)(
  TrainingCategoriesList,
);
