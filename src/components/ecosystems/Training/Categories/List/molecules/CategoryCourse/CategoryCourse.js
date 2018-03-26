import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'natura-ui';

import { orange100 } from 'styles/colors';

import {
  CategoryCourseWrapper,
  CategoryCourseCover,
  CategoryCourseLink,
  CategoryCourseTitleWrapper,
  CategoryCourseIcon,
  CategoryCourseTitle,
  CategoryCourseDuration,
} from './CategoryCourse.styles.js';

const CategoryCourse = ({ course }) => {
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

  return (
    <CategoryCourseWrapper>
      <CategoryCourseLink href={`/training/courses/${course.id}`} title={course.title}>
        <CategoryCourseCover thumbnail={course.thumbnail} />

        <CategoryCourseTitleWrapper viewedPercentage={getViewedPercentage()}>
          <CategoryCourseIcon>
            <Icon file={getCourseIconFileName()} color={orange100} />
          </CategoryCourseIcon>
          <CategoryCourseTitle>{getTruncatedTitle()}</CategoryCourseTitle>

          {getDurationNode()}
        </CategoryCourseTitleWrapper>
      </CategoryCourseLink>
    </CategoryCourseWrapper>
  );
};

CategoryCourse.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CategoryCourse;
