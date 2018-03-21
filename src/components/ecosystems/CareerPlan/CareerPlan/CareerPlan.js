import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { graphql } from 'react-apollo';

import LoadingHandler from 'components/atoms/LoadingHandler';
import CycleMenu from './molecules/CycleMenu';
import CyclesIndicatorList from 'components/ecosystems/CareerPlan/Cycles/organisms/IndicatorList';
import AnualIndicatorList from 'components/ecosystems/CareerPlan/Anual/organisms/IndicatorList';
import { IndicatorListQuery, IndicatorListQueryOptions } from './CareerPlan.data';

import {
  CareerPlanSection,
  CareerPlanTitleWrapper,
  CareerPlanTitle,
  CareerPlanDescription,
} from './CareerPlan.styles';

const CYCLES_PER_VIEW = 10;
const CYCLES_MENUS = {
  CyclesFirstRange: 1,
  CyclesSecondRange: 2,
  Anual: 3,
};

export class CareerPlan extends Component {
  state = {
    activeMenu: CYCLES_MENUS.CyclesFirstRange,
  };

  componentWillReceiveProps({ loading, indicators }) {
    this.handleLoadingFinished({ loading, indicators });
    this.setIndicators(indicators);
  }

  onMenuChange = menuItem => {
    this.setState({ activeMenu: menuItem.id });
  };

  handleLoadingFinished = ({ loading, indicators }) => {
    if (loading) {
      return;
    }

    this.setMenu({ indicators });
  };

  setMenu = ({ indicators }) => {
    const menuItems = [
      {
        id: CYCLES_MENUS.CyclesFirstRange,
        label: `Ciclo 01-${CYCLES_PER_VIEW}`,
      },
      {
        id: CYCLES_MENUS.CyclesSecondRange,
        label: `Ciclo ${CYCLES_PER_VIEW + 1}-${indicators[0].cycles.length}`,
      },
      {
        id: CYCLES_MENUS.Anual,
        label: 'Anual',
      },
    ];

    this.setState({ menuItems });
  };

  setIndicators = indicators => {
    if (!indicators) {
      return;
    }

    this.setState({ indicators });
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
    const { pastIndicators, concepts } = this.props;

    if (!indicators) {
      return null;
    }

    if (activeMenu === CYCLES_MENUS.CyclesFirstRange) {
      return (
        <CyclesIndicatorList
          indicators={indicators}
          range={{ from: 0, to: 10 }}
          updateCycle={this.updateCycle}
          concepts={concepts}
        />
      );
    }

    if (activeMenu === CYCLES_MENUS.CyclesSecondRange) {
      return (
        <CyclesIndicatorList
          indicators={indicators}
          range={{ from: 11, to: 999 }}
          updateCycle={this.updateCycle}
          concepts={concepts}
        />
      );
    }

    if (activeMenu === CYCLES_MENUS.Anual) {
      return (
        <AnualIndicatorList
          indicators={indicators}
          pastIndicators={pastIndicators}
          concepts={concepts}
        />
      );
    }
  }

  renderMenu() {
    const { activeMenu, menuItems } = this.state;

    if (!menuItems) {
      return null;
    }

    return (
      <CycleMenu menuItems={menuItems} onMenuChange={this.onMenuChange} activeMenu={activeMenu} />
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <CareerPlanSection>
        <LoadingHandler loading={loading}>
          <div>
            <CareerPlanTitleWrapper>
              <CareerPlanTitle>
                <FormattedMessage id="careerPlanTitle" />
              </CareerPlanTitle>

              <CareerPlanDescription>
                <FormattedMessage id="careerPlanDescription" />
              </CareerPlanDescription>
            </CareerPlanTitleWrapper>

            {this.renderMenu()}
            {this.renderIndicatorList()}
          </div>
        </LoadingHandler>
      </CareerPlanSection>
    );
  }
}

export const CareerPlanWithIntl = injectIntl(CareerPlan);

export default graphql(IndicatorListQuery, IndicatorListQueryOptions)(CareerPlanWithIntl);
