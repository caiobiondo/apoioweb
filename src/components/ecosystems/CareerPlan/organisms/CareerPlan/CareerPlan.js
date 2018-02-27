import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import {
  CareerPlanSection,
  CareerPlanTitleWrapper,
  CareerPlanTitle,
  CareerPlanDescription,
} from './CareerPlan.styles';

export class CareerPlan extends Component {
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
      </CareerPlanSection>
    );
  }
}

export const CareerPlanWIthIntl = injectIntl(CareerPlan);

export default CareerPlanWIthIntl;
