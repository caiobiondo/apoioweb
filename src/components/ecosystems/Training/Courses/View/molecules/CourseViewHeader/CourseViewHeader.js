import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Icon } from 'natura-ui';
import { Link } from 'react-router-dom';
import { translate } from 'locale';

import {
  Header,
  BackButtonWrapper,
  BackButtonIcon,
  BackButtonText,
} from './CourseViewHeader.styles';

export class CourseViewHeader extends Component {
  render() {
    return (
      <Header>
        <Row>
          <Col md={12} sm={12}>
            <BackButtonWrapper>
              <Link to="/training/categories">
                <BackButtonIcon>
                  <Icon file="ico_back" />
                </BackButtonIcon>

                <BackButtonText>{translate('trainings')}</BackButtonText>
              </Link>
            </BackButtonWrapper>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default CourseViewHeader;
