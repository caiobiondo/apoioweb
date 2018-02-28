import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import {
  TittleWrapper,
  CategoryNameWrapper,
  Divider,
  DescriptionWrapper,
} from './CourseDescription.styles';

class CourseDescription extends Component {
  render() {
    const { course } = this.props;

    return (
      <div>
        <Row>
          <Col md={12} sm={12}>
            <TittleWrapper>{course.title}</TittleWrapper>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col md={12} sm={12}>
            <DescriptionWrapper>{course.description}</DescriptionWrapper>
          </Col>
        </Row>
      </div>
    );
  }
}

CourseDescription.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseDescription;
