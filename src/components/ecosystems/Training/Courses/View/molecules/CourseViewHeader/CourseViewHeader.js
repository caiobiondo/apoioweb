import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Icon } from 'natura-ui';
import { withRouter } from 'react-router-dom';
import { translate } from 'locale';
import { ROUTE_PREFIX } from 'config';

import {
  Header,
  BackButtonWrapper,
  BackButtonIcon,
  BackButtonText,
} from './CourseViewHeader.styles';

export class CourseViewHeader extends Component {
  goBack = () => {
    if (this.props.handleBackClick) {
      this.props.handleBackClick();
    } else {
      this.props.history.goBack();
    }
  };

  render() {
    return (
      <Header>
        <Row>
          <Col md={12} sm={12}>
            <BackButtonWrapper onClick={this.goBack}>
              <BackButtonIcon>
                <Icon file="ico_back" />
              </BackButtonIcon>

              <BackButtonText>{translate('trainings')}</BackButtonText>
            </BackButtonWrapper>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default withRouter(CourseViewHeader);
