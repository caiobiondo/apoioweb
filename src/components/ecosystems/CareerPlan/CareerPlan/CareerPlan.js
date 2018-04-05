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

  componentWillReceiveProps(nextProps) {
    this.handleIndicators(nextProps);
  }

  handleIndicators = ({ indicators, consolidatedCycles }) => {
    if (!indicators && !consolidatedCycles) {
      return;
    }

    this.setState({ indicators, consolidatedCycles });
  };

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

  updateCycle = ({ cycle, indicatorType }, cb = () => {}) => {
    const currentIndicators = this.state.indicators;
    const indicator = currentIndicators.filter(i => i.indicatorType === indicatorType)[0];
    const cycles = this.getEditedCycles(indicator.cycles, cycle);
    const indicators = this.getEditedIndicators(currentIndicators, { cycles, indicatorType });

    this.setState({ indicators }, cb);
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
        directSale: directSale || 0,
        naturaNetwork: naturaNetwork || 0,
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
      this.setState({ consolidatedCycles: data.consolidatedOvercoming });
    });
  };

  render() {
    const { loading, pastIndicators, pastConsolidatedCycles, concepts } = this.props;
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
              consolidatedCycles={consolidatedCycles}
              pastConsolidatedCycles={pastConsolidatedCycles}
              concepts={concepts}
              activeMenu={activeMenu}
              cyclesPerPage={this.cyclesPerPage}
              fetchOvercoming={this.fetchOvercoming}
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
