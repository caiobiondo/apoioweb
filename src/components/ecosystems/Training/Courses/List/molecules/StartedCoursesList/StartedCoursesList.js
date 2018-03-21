import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { translate } from 'locale';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import {
  Header,
  Wrapper,
  CourseInCoverInfo,
  CourseCategoryTitle,
  CourseTitle,
  LeftCarouselArrow,
  RightCarouselArrow,
  StartedCoursesWrapper,
  StartedCoursesThumbnail,
} from './StartedCoursesList.styles';
import {
  TrainingCoursesQuery,
  TrainingCoursesQueryOptions,
} from 'components/ecosystems/Training/data/TrainingCourses.data';
import { graphql } from 'react-apollo';

import ImageWithFallback from 'components/molecules/ImageWithFallback';

export class StartedCoursesList extends Component {
  handleCourseClick = course => event => {
    const url = course.type === 'VIDEO' ? `${course.id}` : `${course.id}/start`;

    this.props.history.push(`/training/courses/${url}`);
  };

  render() {
    const settings = {
      arrows: true,
      autoplay: false,
      autoplaySpeed: 5000,
      adaptiveHeight: true,
      dots: true,
      draggable: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <LeftCarouselArrow>{'<'}</LeftCarouselArrow>,
      nextArrow: <RightCarouselArrow>{'>'}</RightCarouselArrow>,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: false,
            draggable: true,
            autoplay: false,
          },
        },
      ],
    };
    const { courses } = this.props;
    if (!courses) return null;
    return (
      <Wrapper>
        <Header>{translate('continueCourses')}</Header>
        <StartedCoursesWrapper>
          <Slider {...settings}>
            {courses.map(course => {
              return (
                <StartedCoursesThumbnail key={course.id}>
                  <CourseInCoverInfo onClick={this.handleCourseClick(course)}>
                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseCategoryTitle>{course.categoryTitle}</CourseCategoryTitle>
                  </CourseInCoverInfo>
                  <ImageWithFallback imageUrl={course.thumbnail} />
                </StartedCoursesThumbnail>
              );
            })}
          </Slider>
        </StartedCoursesWrapper>
      </Wrapper>
    );
  }
}

StartedCoursesList.propTypes = {
  user: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
};

export const StartedCoursesListWithRouter = withRouter(StartedCoursesList);

export default graphql(TrainingCoursesQuery, TrainingCoursesQueryOptions)(
  StartedCoursesListWithRouter,
);
