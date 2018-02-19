import React, { Component } from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { Loading, CircularProgress, Paper } from 'natura-ui';
import { TrainingCoursesQuery, TrainingCoursesQueryOptions } from './TrainingCoursesList.data';
import { graphql } from 'react-apollo';

import InfiniteScroll from 'react-infinite-scroller';

import { WrapperStyle, LoadingWrapper, fullContainer } from './TrainingCoursesList.styles';

export class TrainingCoursesList extends Component {
  state = {
    hasMoreItems: true,
  };

  componentWillReceiveProps({ loading, courses }) {
    this.notifyLoadFinish(loading, courses);
    this.checkIfHasMoreItems(loading, courses);
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

    const hasMoreItems = (items && !this.props.items) || items.length !== this.props.items.length;
    this.setState({ hasMoreItems });
  };

  isLoading = (loading, items) => {
    return loading && !items;
  };

  isEmpty = (loading, items) => {
    return !loading && (!items || items.length === 0);
  };

  render() {
    if (!this.props.courses && this.props.loading) {
      return <Loading background="transparent" />;
    }

    if (!this.props.courses || !this.props.courses.length) {
      return (
        <Paper style={fullContainer}>
          <EmptyList
            icon="ico_list_add"
            titleId="coursesEmptyList"
            descriptionId="coursesEmptyListDescription"
          />
        </Paper>
      );
    }

    return (
      <Paper style={WrapperStyle}>
        <InfiniteScroll
          loadMore={this.props.fetchMore}
          hasMore={this.props.hasMultiplePages && this.state.hasMoreItems}
          loader={
            <LoadingWrapper>
              <CircularProgress thickness={2} />
            </LoadingWrapper>
          }
        >
          <div />
        </InfiniteScroll>
      </Paper>
    );
  }
}

export default graphql(TrainingCoursesQuery, TrainingCoursesQueryOptions)(TrainingCoursesList);
