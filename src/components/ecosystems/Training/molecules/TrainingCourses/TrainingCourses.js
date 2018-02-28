import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrainingCourse from 'components/ecosystems/Training/molecules/TrainingCourse';

import { List } from './TrainingCourses.styles';

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
    if (!this.props.courses || !this.props.courses.length) {
      return null;
    }

    return (
      <List>
        {this.props.courses.map((course, index) => (
          <TrainingCourse key={index} course={course}>
            {this.props.renderMenuItems(course)}
          </TrainingCourse>
        ))}
      </List>
    );
  }
}

TrainingCourses.propTypes = {
  renderMenuItems: PropTypes.func,
  onLoadFinished: PropTypes.func,
};
