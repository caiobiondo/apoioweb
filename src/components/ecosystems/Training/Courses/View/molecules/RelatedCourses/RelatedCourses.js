import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'locale';
import { Paper } from 'natura-ui';
import Slider from 'react-slick';
import CategoryCourse from '../../../../Categories/List/molecules/CategoryCourse';
import {
  Header,
  PaperWrapper,
  Wrapper,
  LeftCarouselArrow,
  RightCarouselArrow,
  CourseCoverList,
  paperStyle,
  CourseWrapper,
} from './RelatedCourses.styles';

export class RelatedCourses extends Component {
  slickSettings = coursesLength => {
    const slick = {
      dots: false,
      infinite: false,
      arrows: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 2,
      autoplay: false,
      autoplaySpeed: 5000,
      draggable: false,
      responsive: [
        { breakpoint: 980, settings: 'unslick' },
        { breakpoint: 1233, settings: { slidesToShow: 2 } },
        { breakpoint: 1490, settings: { slidesToShow: 3 } },
        { breakpoint: 1740, settings: { slidesToShow: 4 } },
        { breakpoint: 1800, settings: { slidesToShow: 5 } },
      ],
      prevArrow: <LeftCarouselArrow>{'<'}</LeftCarouselArrow>,
      nextArrow: <RightCarouselArrow>{'>'}</RightCarouselArrow>,
    };
    const unslick = {
      infinite: false,
      arrows: true,
      draggable: false,
      responsive: [
        { breakpoint: 950, settings: 'unslick' },
        { breakpoint: 1190, settings: { slidesToShow: 2 } },
        { breakpoint: 1440, settings: { slidesToShow: 3 } },
        { breakpoint: 1500, settings: { slidesToShow: 4 } },
        { breakpoint: 10000, settings: 'unslick' },
      ],
      prevArrow: <div />,
      nextArrow: <div />,
    };

    return coursesLength < 5 ? unslick : slick;
  };

  render() {
    const { courses } = this.props;
    if (!courses || !courses.length) return null;
    const currentSettings = this.slickSettings(courses.length);

    return (
      <PaperWrapper>
        <Paper style={paperStyle}>
          <Wrapper>
            <Header>{translate('relatedTraining')}</Header>
            <CourseCoverList>
              <Slider {...currentSettings}>
                {courses.map(course => {
                  return (
                    <CourseWrapper key={course.id}>
                      <CategoryCourse course={course} />
                    </CourseWrapper>
                  );
                })}
              </Slider>
            </CourseCoverList>
          </Wrapper>
        </Paper>
      </PaperWrapper>
    );
  }
}

RelatedCourses.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default RelatedCourses;
