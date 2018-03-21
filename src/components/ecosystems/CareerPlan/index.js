import React, { Component } from 'react';

import CareerPlan from './CareerPlan';

export default class CareerPlanWrapper extends Component {
  render() {
    return <CareerPlan user={this.props.user} />;
  }
}
