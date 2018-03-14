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

    this.state = {
      activeMenu: 1,
      menuItems: [
        {
          id: 1,
          label: `Ciclo 01-${CYCLES_PER_VIEW}`,
        },
        {
          id: 2,
          label: `Ciclo ${CYCLES_PER_VIEW + 1}-${props.indicators[0].cycles.length}`,
        },
        {
          id: 3,
          label: 'Anual',
        },
      ],
      indicators: props.indicators,
    };
  }

  onMenuChange = menuItem => {
    this.setState({ activeMenu: menuItem.id });
  };

  getEditedIndicators = (indicators, indicatorToEdit) => {
    return indicators.map(indicator => {
      if (indicator.indicatorType !== indicatorToEdit.indicatorType) {
        return indicator;
      }

      return { ...indicator, ...indicatorToEdit };
    });
  };

  getEditedCycles = (cycles, cycleToEdit) => {
    return cycles.map(cycle => {
      if (cycle.cycle !== cycleToEdit.cycle) {
        return cycle;
      }

      return { ...cycle, ...cycleToEdit };
    });
  };

  updateCycle = ({ cycle, indicatorType }, cb) => {
    const currentIndicators = this.state.indicators;
    const indicator = currentIndicators.filter(i => i.indicatorType === indicatorType)[0];
    const cycles = this.getEditedCycles(indicator.cycles, cycle);
    const indicators = this.getEditedIndicators(currentIndicators, { cycles, indicatorType });

    this.setState({ indicators }, cb);
  };

  renderIndicatorList() {
    const { activeMenu, indicators } = this.state;

    if (activeMenu === 1) {
      return (
        <IndicatorList
          indicators={indicators}
          range={{ from: 0, to: 10 }}
          updateCycle={this.updateCycle}
        />
      );
    }

    if (activeMenu === 2) {
      return (
        <IndicatorList
          indicators={indicators}
          range={{ from: 11, to: 999 }}
          updateCycle={this.updateCycle}
        />
      );
    }

    if (activeMenu === 3) {
      return <div>teste</div>;
    }
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

        {this.renderIndicatorList()}
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
