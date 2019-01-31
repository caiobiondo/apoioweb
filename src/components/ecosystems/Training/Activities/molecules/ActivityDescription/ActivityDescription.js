import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { TittleWrapper } from './ActivityDescription.styles';

export class ActivityDescription extends Component {
  render() {
    const { activity } = this.props;

    return (
      <div>
        <Row>
          <Col md={12} sm={12}>
            <TittleWrapper>{activity.name}</TittleWrapper>
          </Col>
        </Row>
      </div>
    );
  }
}

ActivityDescription.propTypes = {
  activity: PropTypes.object.isRequired,
};

export default ActivityDescription;
