import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import Indicator from '../Indicator';
import Consolidated from '../Consolidated/Consolidated';

import { IndicatorTypes, IndicatorTypesLabels } from '../../IndicatorTypes.enum';

import {
  CareerPlanSection,
  CareerPlanTitleWrapper,
  CareerPlanTitle,
  CareerPlanDescription,
  IndicatorListWrapper,
} from './CareerPlan.styles';

export class CareerPlan extends Component {
  constructor() {
    super();
    this.indicators = this.getParsedIndicators();
  }

  getParsedIndicators = () => {
    return Object.values(IndicatorTypes).map(id => ({
      id,
      title: IndicatorTypesLabels[id],
      weight: 50,
    }));
  };

  render() {
    return (
      <CareerPlanSection>
        <CareerPlanTitleWrapper>
          <CareerPlanTitle>
            <FormattedMessage id="careerPlanTitle" />
          </CareerPlanTitle>

          <CareerPlanDescription>
            <FormattedMessage id="careerPlanDescription" />
          </CareerPlanDescription>
        </CareerPlanTitleWrapper>

        <IndicatorListWrapper>
          {this.indicators.map(indicator => <Indicator key={indicator.id} indicator={indicator} />)}
        </IndicatorListWrapper>

        <Consolidated />
      </CareerPlanSection>
    );
  }
}

export const CareerPlanWithIntl = injectIntl(CareerPlan);

export default CareerPlanWithIntl;
