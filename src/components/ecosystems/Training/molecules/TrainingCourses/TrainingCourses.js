import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import TrainingCourse from 'components/ecosystems/Training/molecules/TrainingCourse';
import { Loading, CircularProgress } from 'natura-ui';

import InfiniteScroll from 'react-infinite-scroller';

import { TrainingCoursesWrapper, List, LoadingWrapper } from './TrainingCourses.styles';

export default class TrainingCourses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMoreItems: true,
    };
  }

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
    if (!this.props.courses || !this.props.courses.lenght) {
      return null;
    }

    return (
      <TrainingCoursesWrapper>
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
              <TrainingCourse key={index} course={course}>
                {this.props.renderMenuItems(course)}
              </TrainingCourse>
            ))}
          </List>
        </InfiniteScroll>
      </TrainingCoursesWrapper>
    );
  }
}

TrainingCourses.propTypes = {
  renderMenuItems: PropTypes.func,
  onLoadFinished: PropTypes.func,
};
