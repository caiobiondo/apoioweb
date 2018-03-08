import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import IndicatorList from '../IndicatorList';

import {
  CareerPlanSection,
  CareerPlanTitleWrapper,
  CareerPlanTitle,
  CareerPlanDescription,
} from './CareerPlan.styles';

export class CareerPlan extends Component {
  render() {
    const indicators = [{ id: 1 }, { id: 1 }, { id: 1 }];

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

        <IndicatorList indicators={indicators} />
      </CareerPlanSection>
    );
  }
}

export const CareerPlanWithIntl = injectIntl(CareerPlan);

export default CareerPlanWithIntl;
