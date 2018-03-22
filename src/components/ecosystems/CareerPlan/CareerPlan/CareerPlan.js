import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { graphql, withApollo } from 'react-apollo';

import CareerPlanMenus from 'components/ecosystems/CareerPlan/enums/CareerPlanMenus';

import LoadingHandler from 'components/atoms/LoadingHandler';
import CycleMenu from './molecules/CycleMenu';
import CycleMenuViewer from './molecules/CycleMenuViewer';

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
    const { loading, pastIndicators, concepts } = this.props;
    const { activeMenu, indicators, consolidatedCycles } = this.state;

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

            <CycleMenu
              indicators={indicators}
              onMenuChange={this.onMenuChange}
              activeMenu={activeMenu}
              cyclesPerPage={this.cyclesPerPage}
            />

            <CycleMenuViewer
              indicators={indicators}
              pastIndicators={pastIndicators}
              concepts={concepts}
              consolidatedCycles={consolidatedCycles}
              activeMenu={activeMenu}
              cyclesPerPage={this.cyclesPerPage}
              fetchOvercoming={this.fetchOvercoming}
              fetchConsolidatedOvercoming={this.fetchConsolidatedOvercoming}
            />
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
