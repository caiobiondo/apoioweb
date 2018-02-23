import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, getRowProps } from 'react-flexbox-grid';
import { Icon } from 'natura-ui';

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

const renderBanner = category => {
  if (!category.banners || category.banners.length === 0) {
    return null;
  }

  const banner = category.banners[0];

  return <Banner thumbnail={banner.thumbnail} />;
};

const getCompletedPercentage = category => {
  const { totalOfCoursesCompleted, totalOfCourses } = category;

  if (!totalOfCoursesCompleted || !totalOfCourses) {
    return 0;
  }

  return (totalOfCoursesCompleted * 100 / totalOfCourses).toFixed(2);
};

const Category = ({ category }) => {
  const rowProps = getRowProps({});

  const completedPercentage = getCompletedPercentage(category);

  return (
    <Header>
      <Row>
        <Col md={4} sm={12}>
          <BackButtonWrapper href="/training/categories">
            <BackButtonIcon>
              <Icon file="ico_pencil" />
            </BackButtonIcon>

            <BackButtonText>{category.name}</BackButtonText>
          </BackButtonWrapper>
        </Col>

        <Col md={8} sm={12}>
          <Row start="sm" end="md">
            <Col xs={12}>
              <CategoryPercentageLabel>
                <strong>{completedPercentage}%</strong> Completa
              </CategoryPercentageLabel>
              <CategoryPercentageBar completedPercentage={completedPercentage} />
            </Col>
          </Row>
        </Col>
      </Row>

      <BannerWrapper className={rowProps.className}>
        <Col xs={12}>{renderBanner(category)}</Col>
      </BannerWrapper>
    </Header>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
};

export default Category;
