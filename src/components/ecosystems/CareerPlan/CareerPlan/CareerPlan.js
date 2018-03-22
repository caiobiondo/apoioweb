import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { graphql, withApollo } from 'react-apollo';

import CareerPlanMenus from 'components/ecosystems/CareerPlan/enums/CareerPlanMenus';

import LoadingHandler from 'components/atoms/LoadingHandler';
import CycleMenu from './molecules/CycleMenu';
import CyclesIndicatorList from 'components/ecosystems/CareerPlan/Cycles/organisms/IndicatorList';
import AnualIndicatorList from 'components/ecosystems/CareerPlan/Anual/organisms/IndicatorList';
import {
  IndicatorListQuery,
  IndicatorListQueryOptions,
  OvercomingQuery,
  ConsolidatedOvercomingQuery,
} from './CareerPlan.data';

import {
  CareerPlanSection,
  CareerPlanTitleWrapper,
  CareerPlanTitle,
  CareerPlanDescription,
} from './CareerPlan.styles';

export class CareerPlan extends Component {
  constructor() {
    super();
    this.state = { activeMenu: CareerPlanMenus.CyclesFirstRange };
    this.cyclesPerPage = 10;
  }

  componentWillReceiveProps({ loading, indicators }) {
    this.handleIndicatorsChange(indicators);
  }

  onMenuChange = menuItem => {
    this.setState({ activeMenu: menuItem.id });
  };

  setIndicators = indicators => {
    this.setState({ indicators });
  };

  setConsolidatedCycles = consolidatedCycles => {
    this.setState({ consolidatedCycles });
  };

  handleIndicatorsChange = indicators => {
    if (!indicators) {
      return;
    }

    this.setIndicators(indicators);
    this.fetchConsolidatedOvercoming(indicators);
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

    this.setState({ indicators }, () => {
      this.fetchConsolidatedOvercoming(indicators);
      cb();
    });
  };

  fetchOvercoming = ({ indicatorType, cycle }, cb) => {
    const { user, client } = this.props;
    const { directSale, naturaNetwork } = cycle;

    if (!naturaNetwork && !directSale) {
      return this.updateCycle({ cycle: { ...cycle, overcoming: null }, indicatorType });
    }

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

    client.query(query).then(({ data }) => {
      const overcoming = data.overcoming[0];
      const updateCycleModel = {
        indicatorType,
        cycle: { ...cycle, overcoming },
      };

      this.updateCycle(updateCycleModel, cb);
    });
  };

  fetchConsolidatedOvercoming = indicators => {
    const { user, client } = this.props;
    const query = {
      query: ConsolidatedOvercomingQuery,
      variables: {
        year: 1,
        simulation: indicators.map(item => ({ indicatorType: item.indicatorType })),
        sellerId: user.codigo,
      },
    };

    client.query(query).then(({ data }) => {
      this.setConsolidatedCycles(data.consolidatedOvercoming);
    });
  };

  renderIndicatorList() {
    const { activeMenu, indicators, consolidatedCycles } = this.state;
    const { pastIndicators, concepts, user } = this.props;

    if (activeMenu === CareerPlanMenus.CyclesFirstRange) {
      return (
        <CyclesIndicatorList
          indicators={indicators}
          consolidatedCycles={consolidatedCycles}
          range={{ from: 0, to: this.cyclesPerPage }}
          fetchOvercoming={this.fetchOvercoming}
          fetchConsolidatedOvercoming={this.fetchConsolidatedOvercoming}
          concepts={concepts}
          user={user}
        />
      );
    }

    if (activeMenu === CareerPlanMenus.CyclesSecondRange) {
      return (
        <CyclesIndicatorList
          indicators={indicators}
          consolidatedCycles={consolidatedCycles}
          range={{ from: 2 * this.cyclesPerPage - this.cyclesPerPage, to: 999 }}
          fetchOvercoming={this.fetchOvercoming}
          fetchConsolidatedOvercoming={this.fetchConsolidatedOvercoming}
          concepts={concepts}
          user={user}
        />
      );
    }

    if (activeMenu === CareerPlanMenus.Anual) {
      return (
        <AnualIndicatorList
          indicators={indicators}
          consolidatedCycles={consolidatedCycles}
          pastIndicators={pastIndicators}
          concepts={concepts}
        />
      );
    }
  }

  renderMenu() {
    const { activeMenu } = this.state;
    const { indicators } = this.props;

    return (
      <CycleMenu
        indicators={indicators}
        onMenuChange={this.onMenuChange}
        activeMenu={activeMenu}
        cyclesPerPage={this.cyclesPerPage}
      />
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
