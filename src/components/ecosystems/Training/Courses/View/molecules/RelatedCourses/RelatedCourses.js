import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { translate } from 'locale';
import { Paper } from 'natura-ui';
import Slider from 'react-slick';
import {
  Header,
  PaperWrapper,
  Wrapper,
  CourseCover,
  LeftCarouselArrow,
  RightCarouselArrow,
  CourseCoverWrapper,
  CourseCoverPeriod,
  CourseCoverTitle,
  CourseInCoverInfo,
  CourseCoverList,
  paperStyle,
} from './RelatedCourses.styles';

import ImageWithFallback from 'components/molecules/ImageWithFallback';

export class RelatedCourses extends Component {
  openCourse = course => {};

  render() {
    const settings = {
      dots: false,
      infinite: false,
      arrows: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 5000,
      draggable: false,
      responsive: [
        { breakpoint: 768, settings: 'unslick' },
        { breakpoint: 1208, settings: 'unslick' },
        { breakpoint: 1210, settings: { slidesToShow: 2 } },
      ],
      prevArrow: <LeftCarouselArrow>{'<'}</LeftCarouselArrow>,
      nextArrow: <RightCarouselArrow>{'>'}</RightCarouselArrow>,
    };
    const { courses } = this.props;
    console.log('cursos', courses.length);
    if (!courses) return null;

    return (
      <PaperWrapper>
        <Paper style={paperStyle}>
          <Wrapper>
            <Header>{translate('RelatedTraining')}</Header>
            <CourseCoverList>
              <Slider {...settings}>
                {courses.map(course => {
                  return (
                    <CourseCoverWrapper key={course.id} onClick={() => this.openCourse(course)}>
                      <CourseInCoverInfo>
                        <CourseCoverPeriod>
                          {translate('magazineCycle')} {course.period}
                        </CourseCoverPeriod>
                        <CourseCoverTitle>{course.title}</CourseCoverTitle>
                      </CourseInCoverInfo>
                      <CourseCover>
                        <ImageWithFallback imageUrl={course.thumbnail} />
                      </CourseCover>
                    </CourseCoverWrapper>
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

export default withRouter(RelatedCourses);
