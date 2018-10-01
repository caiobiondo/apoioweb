import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import moment from 'moment';
import { translate } from 'locale';

import { ToggleStar, ToggleStarBorder } from 'material-ui/svg-icons';
import { Rating } from 'natura-ui';
import { orange100, gray150, red500 } from 'styles/colors';
import {
  ColWrapper,
  CategoryWrapper,
  DateWrapper,
  RatingWrapper,
  RowWrapper,
  TittleWrapper,
} from './CourseScormFooter.styles';

export class CourseScormFooter extends Component {
  getFormatedDate(date) {
    return moment(date).format('dd/MM/yyyy');
  }

  render() {
    const { course } = this.props;

    const rating = course.ratedByYou === 'true' ? course.myRating : course.generalRating;
    const ratingColorNormal = course.ratedByYou === 'true' ? red500 : gray150;
    const ratingColorFilled = course.ratedByYou === 'true' ? red500 : orange100;

    return (
      <RowWrapper>
        <Row>
          <ColWrapper>
            <TittleWrapper>{translate('courseDate')}</TittleWrapper>
            <DateWrapper>{this.getFormatedDate(course.dateUpload)}</DateWrapper>
          </ColWrapper>
          <ColWrapper>
            <TittleWrapper>{translate('courseCategory')}</TittleWrapper>
            <CategoryWrapper>{this.course.category}</CategoryWrapper>
          </ColWrapper>
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
        </Row>
      </RowWrapper>
    );
  }
}

CourseScormFooter.Prototypes = {
  course: PropTypes.object.isRequired,
};
