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

  return (
    <CategoryCourseWrapper>
      <CategoryCourseLink href={`/training/courses/${course.id}`} title={course.title}>
        <CategoryCourseCover thumbnail={course.thumbnail} />

        <CategoryCourseTitleWrapper>
          <CategoryCourseIcon>
            <Icon file="ico_film_stock" color={orange100} />
          </CategoryCourseIcon>
          <CategoryCourseTitle>{getTruncatedTitle()}</CategoryCourseTitle>

          <CategoryCourseDuration>{getDurationInMinutes()}min</CategoryCourseDuration>
        </CategoryCourseTitleWrapper>
      </CategoryCourseLink>
    </CategoryCourseWrapper>
  );
};

export default CategoryCourse;
