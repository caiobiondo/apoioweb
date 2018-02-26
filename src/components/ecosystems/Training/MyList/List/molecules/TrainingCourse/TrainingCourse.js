import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TrainingCourseWrapper,
  TrainingCoursePaper,
  TrainingCourseThumbnail,
  TrainingCourseDescriptionWrapper,
  TrainingCourseIconWrapper,
  TrainingCourseDescription,
  TrainingCourseDescriptionTitle,
  TrainingCourseDescriptionViews,
  TrainingCourseMenu,
  TrainingCourseMenuItem,
} from './TrainingCourse.styles';
import { Icon, CircularProgress, Loading } from 'natura-ui';
import ImageWithFallback from 'components/molecules/ImageWithFallback/ImageWithFallback';
import Img from 'react-image';
import { translate } from 'locale';
import { RobotoRegular } from 'styles/typography';

class TrainingCourse extends Component {
  renderCourseIcon = course => {
    if (course.type === 'VIDEO') {
      return (
        <TrainingCourseIconWrapper>
          <Icon file="ico_film_stock" />
        </TrainingCourseIconWrapper>
      );
    }

    return (
      <TrainingCourseIconWrapper>
        <Icon file="ico_file" />
      </TrainingCourseIconWrapper>
    );
  };

  render() {
    const { course } = this.props;

    return (
      <TrainingCourseWrapper>
        <TrainingCoursePaper>
          <TrainingCourseDescriptionWrapper>
            {this.renderCourseIcon(course)}
            <TrainingCourseDescription>
              <TrainingCourseDescriptionTitle>{course.title}</TrainingCourseDescriptionTitle>
              <TrainingCourseDescriptionViews>
                {course.views} visualizações - {course.dateUpload}
              </TrainingCourseDescriptionViews>
            </TrainingCourseDescription>
            <TrainingCourseMenu>{this.props.children}</TrainingCourseMenu>
          </TrainingCourseDescriptionWrapper>
          <TrainingCourseThumbnail>
            <ImageWithFallback imageUrl={course.thumbnail} />
          </TrainingCourseThumbnail>
        </TrainingCoursePaper>
      </TrainingCourseWrapper>
    );
  }
}

TrainingCourse.propTypes = {
  course: PropTypes.object,
};

export default TrainingCourse;
