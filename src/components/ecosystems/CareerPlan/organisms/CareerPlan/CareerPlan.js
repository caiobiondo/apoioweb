import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import Indicator from '../Indicator';
import Consolidated from '../Consolidated/Consolidated';
import CycleMenu from '../../molecules/CycleMenu';

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
    this.state = {
      activeMenu: 1,
      menuItems: [
        {
          id: 1,
          label: 'Ciclo 01-10',
          component: this.renderIndicatorList(),
        },
        {
          id: 2,
          label: 'Ciclo 11-19',
          component: <div>oi</div>,
        },
        {
          id: 3,
          label: 'Anual',
          component: <div>teste</div>,
        },
      ],
    };
  }

  getActiveMenuContent = () => {
    const { activeMenu, menuItems } = this.state;
    return menuItems.filter(menuItem => menuItem.id === activeMenu)[0].component;
  };

  onMenuChange = menuItem => {
    this.setState({ activeMenu: menuItem.id });
  };

  getParsedIndicators = () => {
    return Object.values(IndicatorTypes).map(id => ({
      id,
      title: IndicatorTypesLabels[id],
      weight: 50,
    }));
  };

  renderIndicatorList() {
    const { indicators } = this;

    return (
      <div>
        <IndicatorListWrapper>
          {indicators.map(indicator => <Indicator key={indicator.id} indicator={indicator} />)}
        </IndicatorListWrapper>
        <Consolidated />
      </div>
    );
  }

  render() {
    const { activeMenu, menuItems } = this.state;

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

        <CycleMenu menuItems={menuItems} onMenuChange={this.onMenuChange} activeMenu={activeMenu} />

        {this.getActiveMenuContent()}
      </CareerPlanSection>
    );
  }
}

export const CareerPlanWithIntl = injectIntl(CareerPlan);

export default CareerPlanWithIntl;
