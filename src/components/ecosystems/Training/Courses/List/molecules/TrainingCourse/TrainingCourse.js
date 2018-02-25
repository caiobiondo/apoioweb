import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TrainingCourseWrapper,
  TrainingCoursePaper,
  TrainingCourseThumbnail,
  TrainingCourseThumbnailPlay,
  TrainingCourseThumbnailPlayWrapper,
  TrainingCourseThumbnailDurationWrapper,
  TrainingCourseThumbnailStoppedAt,
  TrainingCourseThumbnailCompletedWrapper,
  TrainingCourseThumbnailCompleted,
  TrainingCourseDescriptionWrapper,
  TrainingCourseIconWrapper,
  TrainingCourseDescription,
  TrainingCourseDescriptionTitle,
  TrainingCourseDescriptionViews,
  TrainingCourseMenu,
} from './TrainingCourse.styles';
import { Icon } from 'natura-ui';
import ImageWithFallback from 'components/molecules/ImageWithFallback/ImageWithFallback';
import { injectIntl, FormattedRelative, FormattedPlural } from 'react-intl';
import { translate } from 'locale';
import moment from 'moment';

export class TrainingCourse extends Component {
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

  renderCourseDuration = course => {
    return moment.utc(course.durationInSeconds * 1000).format('mm:ss');
  };

  renderCourseStoppedAt = course => {
    const { stoppedAt, durationInSeconds, status } = course;

    if (!stoppedAt || status === 'completed') return null;

    const percentage = parseInt(stoppedAt * 100.0 / durationInSeconds, 10);

    return <TrainingCourseThumbnailStoppedAt key={3} width={`${percentage}%`} />;
  };

  render() {
    const { course } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <TrainingCourseWrapper key={course.id}>
        <TrainingCoursePaper>
          <TrainingCourseDescriptionWrapper>
            {this.renderCourseIcon(course)}
            <TrainingCourseDescription>
              <TrainingCourseDescriptionTitle>{course.title}</TrainingCourseDescriptionTitle>
              <TrainingCourseDescriptionViews>
                {course.views}&nbsp;
                <FormattedPlural
                  value={course.views}
                  one={formatMessage({ id: 'courseViews.one' })}
                  other={formatMessage({ id: 'courseViews.many' })}
                />
                &nbsp;-&nbsp;
                <FormattedRelative value={course.dateUpload} />
              </TrainingCourseDescriptionViews>
            </TrainingCourseDescription>
            <TrainingCourseMenu>{this.props.children}</TrainingCourseMenu>
          </TrainingCourseDescriptionWrapper>
          <TrainingCourseThumbnail>
            <ImageWithFallback imageUrl={course.thumbnail} />
            {course.type === 'VIDEO' && [
              <TrainingCourseThumbnailPlayWrapper key={1}>
                <TrainingCourseThumbnailPlay />
              </TrainingCourseThumbnailPlayWrapper>,
              <TrainingCourseThumbnailDurationWrapper key={2}>
                {this.renderCourseDuration(course)}
              </TrainingCourseThumbnailDurationWrapper>,
              this.renderCourseStoppedAt(course),
            ]}
            {course.status === 'completed' && [
              <TrainingCourseThumbnailCompletedWrapper key={4}>
                <TrainingCourseThumbnailCompleted>
                  {translate('trainingCourseCompleted')}
                </TrainingCourseThumbnailCompleted>
              </TrainingCourseThumbnailCompletedWrapper>,
            ]}
          </TrainingCourseThumbnail>
        </TrainingCoursePaper>
      </TrainingCourseWrapper>
    );
  }
}

TrainingCourse.propTypes = {
  course: PropTypes.object,
};

export default injectIntl(TrainingCourse);
