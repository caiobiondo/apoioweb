import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'natura-ui';
import { withRouter } from 'react-router-dom';

import { orange100 } from 'styles/colors';

import {
  CategoryCourseWrapper,
  CategoryCourseCover,
  CategoryCourseTitleWrapper,
  CategoryCourseIcon,
  CategoryCourseTitle,
  CategoryCourseDuration,
} from './CategoryCourse.styles.js';
import { ROUTE_PREFIX } from 'config';

export const CategoryCourse = ({ course, ...props }) => {
  const getCourseIconFileName = () => {
    if (course && course.type === 'VIDEO') {
      return 'ico_film_stock';
    }

    return 'ico_file';
  };

  const getTruncatedTitle = () => {
    if (!course.title) {
      return;
    }

    if (course.title.length <= 30) {
      return course.title;
    }

    return `${course.title.substr(0, 30)}...`;
  };

  /* eslint-disable */
  const getDurationInMinutes = () => {
    return `${Math.floor(course.durationInSeconds / 60)}:${('0' +
      Math.floor(course.durationInSeconds % 60)
    ).slice(-2)}`;
  };
  /* eslint-enable */

  const getDurationNode = () => {
    if (!course.durationInSeconds) {
      return null;
    }

    return <CategoryCourseDuration>{getDurationInMinutes()}min</CategoryCourseDuration>;
  };

  const getViewedPercentage = () => {
    if (!course.durationInSeconds || !course.stoppedAt) {
      return 33.33;
    }

    return course.stoppedAt / 100 * course.durationInSeconds;
  };

  const handleCourseClick = () => {
    let url = `${course.id}/web`;
    if (course.type === 'VIDEO') url = `${course.id}/video`;
    if (course.type === 'HTML5') url = `${course.id}/html5`;
    // if (course.type === 'SCORM') url = `${course.id}/scorm`;
    if (course.type === 'SCORM') url = `#`;

    props.history.push(`${ROUTE_PREFIX}/training/courses/${url}`);
  };

  return (
    <CategoryCourseWrapper onClick={handleCourseClick}>
      <CategoryCourseCover thumbnail={course.thumbnail} />

      <CategoryCourseTitleWrapper viewedPercentage={getViewedPercentage()}>
        <CategoryCourseIcon>
          <Icon file={getCourseIconFileName()} color={orange100} />
        </CategoryCourseIcon>
        <CategoryCourseTitle>{getTruncatedTitle()}</CategoryCourseTitle>

        {getDurationNode()}
      </CategoryCourseTitleWrapper>
    </CategoryCourseWrapper>
  );
};

CategoryCourse.propTypes = {
  course: PropTypes.object.isRequired,
};

export default withRouter(CategoryCourse);
