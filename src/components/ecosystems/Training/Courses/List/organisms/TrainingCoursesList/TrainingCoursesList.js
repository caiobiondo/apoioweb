import React, { Component } from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import TrainingCourse from 'components/ecosystems/Training/Courses/List/molecules/TrainingCourse';
import { Loading, CircularProgress, Paper } from 'natura-ui';
import { TrainingCoursesQuery, TrainingCoursesQueryOptions } from './TrainingCoursesList.data';
import PageMenu from 'components/ecosystems/Training/atoms/PageMenu/PageMenu';
import { graphql } from 'react-apollo';

import InfiniteScroll from 'react-infinite-scroller';

import {
  TrainingCoursesListWrapper,
  List,
  LoadingWrapper,
  fullContainer,
} from './TrainingCoursesList.styles';

export class TrainingCoursesList extends Component {
  state = {
    hasMoreItems: true,
  };

  componentWillReceiveProps({ loading, courses }) {
    this.notifyLoadFinish(loading, courses);
    this.checkIfHasMoreItems(loading, courses);
  }

  notifyLoadFinish = (loading, courses) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(this.isEmpty(loading, courses), this.isLoading(loading, courses));
    }
  };

  checkIfHasMoreItems = (loading, courses) => {
    if (this.props.loading === loading || !courses) {
      return;
    }

    const hasMoreItems =
      (courses && !this.props.courses) || courses.length !== this.props.courses.length;
    this.setState({ hasMoreItems });
  };

  isLoading = (loading, courses) => {
    return loading && !courses;
  };

  isEmpty = (loading, courses) => {
    return !loading && (!courses || courses.length === 0);
  };

  render() {
    if (!this.props.courses && this.props.loading) {
      return <Loading background="transparent" />;
    }

    if (!this.props.courses || !this.props.courses.length) {
      return (
        <Paper style={fullContainer}>
          <PageMenu />
          <EmptyList
            icon="ico_list_add"
            titleId="coursesEmptyList"
            descriptionId="coursesEmptyListDescription"
          />
        </Paper>
      );
    }

    return (
      <TrainingCoursesListWrapper>
        <PageMenu />
        <InfiniteScroll
          loadMore={this.props.fetchMore}
          hasMore={this.props.hasMultiplePages && this.state.hasMoreItems}
          loader={
            <LoadingWrapper>
              <CircularProgress thickness={2} />
            </LoadingWrapper>
          }
        >
          <List>
            {this.props.courses.map((course, index) => (
              <TrainingCourse key={index} course={course} />
            ))}
          </List>
        </InfiniteScroll>
      </TrainingCoursesListWrapper>
    );
  }
}

export default graphql(TrainingCoursesQuery, TrainingCoursesQueryOptions)(TrainingCoursesList);
