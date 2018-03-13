import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import propTypes from 'prop-types';

import CycleMenu from '../../molecules/CycleMenu';
import IndicatorList from '../IndicatorList';

import IndicatorMock from './IndicatorMock';

import {
  CareerPlanSection,
  CareerPlanTitleWrapper,
  CareerPlanTitle,
  CareerPlanDescription,
} from './CareerPlan.styles';

const CYCLES_PER_VIEW = 10;

export class CareerPlan extends Component {
  constructor(props) {
    super();

    const careerPlan = this;

    this.state = {
      activeMenu: 1,
      menuItems: [
        {
          id: 1,
          label: `Ciclo 01-${CYCLES_PER_VIEW}`,
          get component() {
            return careerPlan.renderIndicatorList({ range: { from: 0, to: 10 }, ...props });
          },
        },
        {
          id: 2,
          label: `Ciclo ${CYCLES_PER_VIEW + 1}-${props.indicators[0].cycles.length}`,
          get component() {
            return careerPlan.renderIndicatorList({ range: { from: 11, to: 999 }, ...props });
          },
        },
        {
          id: 3,
          label: 'Anual',
          get component() {
            return <div>teste</div>;
          },
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

  renderIndicatorList({ range, indicators }) {
    return <IndicatorList indicators={indicators} range={range} />;
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

CareerPlan.propTypes = {
  indicators: propTypes.array,
};

CareerPlan.defaultProps = {
  indicators: IndicatorMock,
};

export const CareerPlanWithIntl = injectIntl(CareerPlan);

export default CareerPlanWithIntl;
