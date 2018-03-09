import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import Indicator from '../Indicator';
import Consolidated from '../Consolidated/Consolidated';

import {
  CareerPlanSection,
  CareerPlanTitleWrapper,
  CareerPlanTitle,
  CareerPlanDescription,
  IndicatorListWrapper,
} from './CareerPlan.styles';

export class CareerPlan extends Component {
  render() {
    const indicators = [{ id: 1 }, { id: 2 }];

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
          {indicators.map(indicator => <Indicator key={indicator.id} />)}
        </IndicatorListWrapper>

        <Consolidated />
      </CareerPlanSection>
    );
  }
}

export const CareerPlanWithIntl = injectIntl(CareerPlan);

export default CareerPlanWithIntl;
