import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { graphql, withApollo } from 'react-apollo';

import CareerPlanMenus from 'components/ecosystems/CareerPlan/enums/CareerPlanMenus';

import LoadingHandler from 'components/atoms/LoadingHandler';
import CycleMenu from './molecules/CycleMenu';
import CyclesIndicatorList from 'components/ecosystems/CareerPlan/Cycles/organisms/IndicatorList';
import AnualIndicatorList from 'components/ecosystems/CareerPlan/Anual/organisms/IndicatorList';
import { IndicatorListQuery, IndicatorListQueryOptions, OvercomingQuery } from './CareerPlan.data';

import {
  CareerPlanSection,
  CareerPlanTitleWrapper,
  CareerPlanTitle,
  CareerPlanDescription,
} from './CareerPlan.styles';

const CYCLES_PER_VIEW = 10;

export class CareerPlan extends Component {
  state = {
    activeMenu: CareerPlanMenus.CyclesFirstRange,
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
        id: CareerPlanMenus.CyclesFirstRange,
        label: `Ciclo 01-${CYCLES_PER_VIEW}`,
      },
      {
        id: CareerPlanMenus.CyclesSecondRange,
        label: `Ciclo ${CYCLES_PER_VIEW + 1}-${indicators[0].cycles.length}`,
      },
      {
        id: CareerPlanMenus.Anual,
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

  fetchOvercoming = ({ indicatorType, cycle }, cb) => {
    const { user, client } = this.props;
    const { directSale, naturaNetwork } = cycle;

    const query = {
      query: OvercomingQuery,
      variables: {
        indicatorType,
        directSale,
        naturaNetwork,
        sellerId: user.codigo,
        cycleArray: [cycle.cycle],
      },
    };

    if (!naturaNetwork && !directSale) {
      return this.updateCycle({ cycle: { ...cycle, overcoming: null }, indicatorType });
    }

    client.query(query).then(({ data }) => {
      const overcoming = data.overcoming[0];
      const updateCycleModel = {
        indicatorType,
        cycle: { ...cycle, overcoming },
      };

      this.updateCycle(updateCycleModel, cb);
    });
  };

  renderIndicatorList() {
    const { activeMenu, indicators } = this.state;
    const { pastIndicators, concepts } = this.props;

    if (!indicators) {
      return null;
    }

    if (activeMenu === CareerPlanMenus.CyclesFirstRange) {
      return (
        <CyclesIndicatorList
          indicators={indicators}
          range={{ from: 0, to: 10 }}
          fetchOvercoming={this.fetchOvercoming}
          concepts={concepts}
        />
      );
    }

    if (activeMenu === CareerPlanMenus.CyclesSecondRange) {
      return (
        <CyclesIndicatorList
          indicators={indicators}
          range={{ from: 11, to: 999 }}
          fetchOvercoming={this.fetchOvercoming}
          concepts={concepts}
        />
      );
    }

    if (activeMenu === CareerPlanMenus.Anual) {
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

export default withApollo(
  graphql(IndicatorListQuery, IndicatorListQueryOptions)(CareerPlanWithIntl),
);
