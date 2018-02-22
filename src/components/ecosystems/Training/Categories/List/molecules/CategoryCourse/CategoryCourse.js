import React from 'react';

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
  const getCourseIconFileName = course => {
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

  const getDurationInMinutes = () => {
    return `${Math.floor(course.durationInSeconds / 60)}:${Math.floor(
      course.durationInSeconds % 60,
    )}`;
  };

  const getDurationNode = () => {
    if (course.durationInSeconds) {
      return null;
    }

    return <CategoryCourseDuration>{getDurationInMinutes()}min</CategoryCourseDuration>;
  };

  return (
    <CategoryCourseWrapper>
      <CategoryCourseLink href={`/training/courses/${course.id}`} title={course.title}>
        <CategoryCourseCover thumbnail={course.thumbnail} />

        <CategoryCourseTitleWrapper>
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

export default CategoryCourse;
