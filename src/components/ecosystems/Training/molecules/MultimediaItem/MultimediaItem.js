import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MultimediaItemWrapper,
  MultimediaItemPaper,
  MultimediaItemThumbnail,
  MultimediaItemThumbnailPlay,
  MultimediaItemThumbnailPlayWrapper,
  MultimediaItemThumbnailDurationWrapper,
  MultimediaItemThumbnailStoppedAt,
  MultimediaItemThumbnailCompletedWrapper,
  MultimediaItemThumbnailCompleted,
  MultimediaItemDescriptionWrapper,
  MultimediaItemIconWrapper,
  MultimediaItemDescription,
  MultimediaItemDescriptionTitle,
  MultimediaItemDescriptionViews,
  MultimediaItemMenu,
} from './MultimediaItem.styles';
import { Icon } from 'natura-ui';
import ImageWithFallback from 'components/molecules/ImageWithFallback/ImageWithFallback';
import { injectIntl, FormattedRelative, FormattedPlural } from 'react-intl';
import { translate } from 'locale';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { ROUTE_PREFIX } from 'config';
import { gtmPushDataLayerEvent, events } from 'utils/googleTagManager';

export class MultimediaItem extends Component {
  renderCourseIcon = course => {
    if (course.type === 'VIDEO') {
      return (
        <MultimediaItemIconWrapper>
          <Icon file="ico_film_stock" />
        </MultimediaItemIconWrapper>
      );
    }

    return (
      <MultimediaItemIconWrapper>
        <Icon file="ico_file" />
      </MultimediaItemIconWrapper>
    );
  };

  renderCourseDuration = course => {
    return moment.utc(course.durationInSeconds * 1000).format('mm:ss');
  };

  renderCourseStoppedAt = course => {
    const { stoppedAt, durationInSeconds, status } = course;

    if (!stoppedAt || !durationInSeconds || status === 'finished') return null;

    const percentage = parseInt(stoppedAt * 100.0 / durationInSeconds, 10);

    return <MultimediaItemThumbnailStoppedAt key={3} width={`${percentage}%`} />;
  };

  linkTo = course => event => {
    let url = `${course.id}/web`;
    if (course.type === 'VIDEO') url = `${course.id}/video`;
    if (course.type === 'HTML5') url = `${course.id}/html5`;
    if (course.type === 'SCORM') url = `${course.id}/scorm`;

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
      <MultimediaItemWrapper key={course.id}>
        <MultimediaItemPaper>
          <MultimediaItemDescriptionWrapper>
            {this.renderCourseIcon(course)}
            <MultimediaItemDescription onClick={this.linkTo(course)}>
              <MultimediaItemDescriptionTitle>{course.title}</MultimediaItemDescriptionTitle>
              <MultimediaItemDescriptionViews>
                {course.views}&nbsp;
                <FormattedPlural
                  value={course.views}
                  one={formatMessage({ id: 'courseViews.one' })}
                  other={formatMessage({ id: 'courseViews.many' })}
                />
                &nbsp;-&nbsp;
                <FormattedRelative value={course.dateUpload} />
              </MultimediaItemDescriptionViews>
            </MultimediaItemDescription>
            <MultimediaItemMenu>{this.props.children}</MultimediaItemMenu>
          </MultimediaItemDescriptionWrapper>
          <MultimediaItemThumbnail onClick={this.linkTo(course)}>
            <ImageWithFallback imageUrl={course.thumbnail} fallbackIcon="ico_photo" />
            {course.type === 'VIDEO' && [
              <MultimediaItemThumbnailPlayWrapper key={1}>
                <MultimediaItemThumbnailPlay />
              </MultimediaItemThumbnailPlayWrapper>,
              <MultimediaItemThumbnailDurationWrapper key={2}>
                {this.renderCourseDuration(course)}
              </MultimediaItemThumbnailDurationWrapper>,
              this.renderCourseStoppedAt(course),
            ]}
            {course.status === 'finished' && [
              <MultimediaItemThumbnailCompletedWrapper key={4}>
                <MultimediaItemThumbnailCompleted>
                  {translate('trainingCourseCompleted')}
                </MultimediaItemThumbnailCompleted>
              </MultimediaItemThumbnailCompletedWrapper>,
            ]}
          </MultimediaItemThumbnail>
        </MultimediaItemPaper>
      </MultimediaItemWrapper>
    );
  }
}

MultimediaItem.propTypes = {
  multimedia: PropTypes.object.isRequired,
};

export const MultimediaItemwithIntl = injectIntl(MultimediaItem);
export default withRouter(MultimediaItemwithIntl);
