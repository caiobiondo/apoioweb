import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-flexbox-grid';
import {
  TittleWrapper,
  TimeWrapper,
  ColWrapper,
  RatingWrapper,
  RatingStyles,
  RowWrapper,
} from './CourseRating.styles';
import { translate } from 'locale';
import { Rating } from 'natura-ui';

export class CourseRating extends Component {
  /* eslint-disable */
  getDurationInMinutes = course => {
    return `${Math.floor(course.durationInSeconds / 60)}:${('0' +
      Math.floor(course.durationInSeconds % 60)
    ).slice(-2)}`;
  };
  /* eslint-enable */

  render() {
    const { course } = this.props;
    return (
      <RowWrapper>
        <Row>
          <ColWrapper>
            <TittleWrapper>{translate('courseRatingAvaliation')}</TittleWrapper>
            <RatingWrapper>
              <Rating
                value={course.generalRating}
                max={5}
                itemIconStyle={RatingStyles.itemIconStyle}
                itemStyle={RatingStyles.itemStyle}
              />
            </RatingWrapper>
          </ColWrapper>
          <ColWrapper>
            <TittleWrapper>{translate('courseRatingTime')}</TittleWrapper>
            <TimeWrapper>{this.getDurationInMinutes(course)}</TimeWrapper>
          </ColWrapper>
        </Row>
      </RowWrapper>
    );
  }
}

CourseRating.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseRating;
