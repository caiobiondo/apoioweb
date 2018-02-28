import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrainingCourse from 'components/ecosystems/Training/molecules/TrainingCourse';

import { List } from './TrainingCourses.styles';

export default class TrainingCourses extends Component {
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
  courses: PropTypes.array.isRequired,
};
