import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-flexbox-grid';
import {
  TittleWrapper,
  TimeWrapper,
  ColWrapper,
  RatingWrapper,
  RowWrapper,
} from './CourseRating.styles';
import { translate } from 'locale';
import { Rating } from 'natura-ui';
import { ToggleStar, ToggleStarBorder } from 'material-ui/svg-icons';
import { orange100, gray150, red500 } from 'styles/colors';

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

    const rating = course.ratedByYou === 'true' ? course.myRating : course.generalRating;
    const ratingColorNormal = course.ratedByYou === 'true' ? red500 : gray150;
    const ratingColorFilled = course.ratedByYou === 'true' ? red500 : orange100;
    return (
      <RowWrapper>
        <Row>
          <ColWrapper>
            <TittleWrapper>{translate('courseRatingAvaliation')}</TittleWrapper>
            <RatingWrapper ratedByYou={course.ratedByYou}>
              <Rating
                initialRating={rating}
                emptySymbol={<ToggleStarBorder color={ratingColorNormal} />}
                fullSymbol={<ToggleStar color={ratingColorFilled} />}
                readonly
              />
            </RatingWrapper>
          </ColWrapper>
          {course.type === 'VIDEO' && (
            <ColWrapper>
              <TittleWrapper>{translate('courseRatingTime')}</TittleWrapper>
              <TimeWrapper>{this.getDurationInMinutes(course)}</TimeWrapper>
            </ColWrapper>
          )}
        </Row>
      </RowWrapper>
    );
  }
}

CourseRating.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseRating;
