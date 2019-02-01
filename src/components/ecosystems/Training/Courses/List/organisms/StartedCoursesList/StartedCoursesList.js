import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { translate } from 'locale';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import {
  Header,
  Wrapper,
  StartedCourseInfo,
  StartedCourseCategoryTitle,
  StartedCourseTitle,
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
import { ROUTE_PREFIX } from 'config';

export class LeftArrow extends Component {
  render() {
    const { onClick, currentSlide } = this.props;
    if (currentSlide === 0) {
      return null;
    }
    return <LeftCarouselArrow onClick={onClick}>{'<'}</LeftCarouselArrow>;
  }
}

export class RightArrow extends Component {
  render() {
    const { onClick, currentSlide, slideCount, slidesToScroll } = this.props;
    if (currentSlide + slidesToScroll >= slideCount) {
      return null;
    }
    return <RightCarouselArrow onClick={onClick}>{'>'}</RightCarouselArrow>;
  }
}

export class StartedCoursesList extends Component {
  handleCourseClick = course => event => {
    let url = `${course.id}/web`;
    if (course.type === 'VIDEO') url = `${course.id}/video`;
    if (course.type === 'HTML5') url = `${course.id}/html5`;
    if (course.type === 'MODULE') url = `${course.id}/module`;
    if (course.type === 'SCORM') url = `#`;

    this.props.history.push(`${ROUTE_PREFIX}/training/courses/${url}`);
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
      prevArrow: <LeftArrow />,
      nextArrow: <RightArrow slidesToScroll={1} />,
    };

    const { courses } = this.props;

    if (!courses || !courses.length) return null;

    return (
      <Wrapper>
        <Header>{translate('continueCourses')}</Header>
        <StartedCoursesWrapper>
          <Slider {...settings}>
            {courses.map(course => {
              return (
                <StartedCoursesThumbnail key={course.id} imageUrl={course.thumbnail}>
                  <StartedCourseInfo onClick={this.handleCourseClick(course)}>
                    <StartedCourseTitle>{course.title}</StartedCourseTitle>
                    <StartedCourseCategoryTitle>{course.categoryTitle}</StartedCourseCategoryTitle>
                  </StartedCourseInfo>
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
  courses: PropTypes.array,
  status: PropTypes.string.isRequired,
};

export const StartedCoursesListWithRouter = withRouter(StartedCoursesList);

export default graphql(TrainingCoursesQuery, TrainingCoursesQueryOptions)(
  StartedCoursesListWithRouter,
);
