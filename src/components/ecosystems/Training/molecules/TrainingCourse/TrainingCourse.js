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
import { withRouter } from 'react-router-dom';
import { ROUTE_PREFIX } from 'config';
import { gtmPushDataLayerEvent, events, categories, actions } from 'utils/googleTagManager';

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

    if (!stoppedAt || !durationInSeconds || status === 'finished') return null;

    const percentage = parseInt(stoppedAt * 100.0 / durationInSeconds, 10);

    return <TrainingCourseThumbnailStoppedAt key={3} width={`${percentage}%`} />;
  };

  linkTo = course => event => {
    let url = `${course.id}/web`;
    if (course.type === 'VIDEO') url = `${course.id}/video`;
    if (course.type === 'HTML5') url = `${course.id}/html5`;

    gtmPushDataLayerEvent({
      event: events.PAGE_VIEW,
      page: {
        previousUrl: window.location.pathname,
        url: `${ROUTE_PREFIX}/training/courses/${url}`,
        title: document.title,
      },
    });

    this.props.history.push(`${ROUTE_PREFIX}/training/courses/${url}`);
  };

  render() {
    const { course } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <TrainingCourseWrapper key={course.id}>
        <TrainingCoursePaper>
          <TrainingCourseDescriptionWrapper>
            {this.renderCourseIcon(course)}
            <TrainingCourseDescription onClick={this.linkTo(course)}>
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
          <TrainingCourseThumbnail onClick={this.linkTo(course)}>
            <ImageWithFallback imageUrl={course.thumbnail} fallbackIcon="ico_photo" />
            {course.type === 'VIDEO' && [
              <TrainingCourseThumbnailPlayWrapper key={1}>
                <TrainingCourseThumbnailPlay />
              </TrainingCourseThumbnailPlayWrapper>,
              <TrainingCourseThumbnailDurationWrapper key={2}>
                {this.renderCourseDuration(course)}
              </TrainingCourseThumbnailDurationWrapper>,
              this.renderCourseStoppedAt(course),
            ]}
            {course.status === 'finished' && [
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
  course: PropTypes.object.isRequired,
};

export const TrainingCoursewithIntl = injectIntl(TrainingCourse);
export default withRouter(TrainingCoursewithIntl);
