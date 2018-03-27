import React, { Component } from 'react';

import CareerPlan from './CareerPlan';

import { Wrapper } from './index.styles';

export default class CareerPlanWrapper extends Component {
  render() {
    return (
      <Wrapper>
        <CareerPlan user={this.props.user} />
      </Wrapper>
    );
  }
}
