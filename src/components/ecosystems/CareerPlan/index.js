import React, { Component } from 'react';
import moment from 'moment';

import CareerPlan from './CareerPlan';

import { Wrapper } from './index.styles';

import LocalStorageData from 'infra/LocalStorageData';

export default class CareerPlanWrapper extends Component {
  constructor() {
    const { cycle, businessModel, country } = new LocalStorageData();
    super();
    this.currentCycle = parseInt(cycle, 10);
    this.businessModel = businessModel;
    this.country = country;
  }

  currentYear = moment().year();
  pastYear = moment()
    .subtract(1, 'years')
    .year();

  render() {
    return (
      <Wrapper>
        <CareerPlan
          user={this.props.user}
          currentCycle={this.currentCycle}
          businessModel={this.businessModel}
          country={this.country}
          currentYear={this.currentYear}
          pastYear={this.pastYear}
        />
      </Wrapper>
    );
  }
}
