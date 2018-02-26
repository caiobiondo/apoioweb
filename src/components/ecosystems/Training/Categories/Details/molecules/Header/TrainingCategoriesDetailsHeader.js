import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, getRowProps } from 'react-flexbox-grid';
import { Icon } from 'natura-ui';
import { Link } from 'react-router-dom';

import {
  Header,
  BackButtonWrapper,
  BackButtonIcon,
  BackButtonText,
  CategoryPercentageLabel,
  CategoryPercentageBar,
  BannerWrapper,
  Banner,
} from './TrainingCategoriesDetailsHeader.styles';

export class CategoryDetailsHeader extends Component {
  renderBanner = () => {
    const { category } = this.props;

    if (!category.banners || category.banners.length === 0) {
      return null;
    }

    const banner = category.banners[0];

    return <Banner thumbnail={banner.thumbnail} />;
  };

  getParsedPercentage = () => {
    const { category } = this.props;
    const { totalOfCoursesCompleted, totalOfCourses } = category;

    if (!totalOfCoursesCompleted || !totalOfCourses) {
      return 0;
    }

    return (totalOfCoursesCompleted * 100 / totalOfCourses).toFixed(2);
  };

  render() {
    const { category } = this.props;
    const rowProps = getRowProps({});
    const completedPercentage = this.getParsedPercentage();

    return (
      <Header>
        <Row>
          <Col md={4} sm={12}>
            <BackButtonWrapper>
              <Link to="/training/categories">
                <BackButtonIcon>
                  <Icon file="ico_back" />
                </BackButtonIcon>

                <BackButtonText>{category.name}</BackButtonText>
              </Link>
            </BackButtonWrapper>
          </Col>

          <Col md={8} sm={12}>
            <Row start="sm" end="md">
              <Col xs={12}>
                <CategoryPercentageLabel>
                  <strong>{completedPercentage}%</strong>&nbsp;
                  <FormattedMessage id="trainingCategoryCompleted" />
                </CategoryPercentageLabel>
                <CategoryPercentageBar completedPercentage={completedPercentage} />
              </Col>
            </Row>
          </Col>
        </Row>

        <BannerWrapper className={rowProps.className}>
          <Col xs={12}>{this.renderBanner()}</Col>
        </BannerWrapper>
      </Header>
    );
  }
}

CategoryDetailsHeader.propTypes = {
  category: PropTypes.object.isRequired,
};

export const CustomerDetailsWithIntl = injectIntl(CategoryDetailsHeader);

export default CustomerDetailsWithIntl;
