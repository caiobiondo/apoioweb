import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Icon } from 'natura-ui';
import { Link } from 'react-router-dom';

import {
  Header,
  BackButtonWrapper,
  BackButtonIcon,
  BackButtonText,
} from './CourseViewHeader.styles';

export class CourseViewHeader extends Component {
  render() {
    const { course } = this.props;

    return (
      <Header>
        <Row>
          <Col md={4} sm={12}>
            <BackButtonWrapper>
              <Link to="/training/categories">
                <BackButtonIcon>
                  <Icon file="ico_back" />
                </BackButtonIcon>

                <BackButtonText>{course.title}</BackButtonText>
              </Link>
            </BackButtonWrapper>
          </Col>
        </Row>
      </Header>
    );
  }
}

CourseViewHeader.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseViewHeader;
