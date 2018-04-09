import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { graphql, withApollo } from 'react-apollo';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CareerPlanMenus from 'components/ecosystems/CareerPlan/enums/CareerPlanMenus';

import { Loading } from 'natura-ui';
import LoadingHandler from 'components/atoms/LoadingHandler';
import CycleMenu from './molecules/CycleMenu';
import CycleMenuViewer from './molecules/CycleMenuViewer';

import {
  IndicatorListQuery,
  IndicatorListQueryOptions,
  OvercomingQuery,
  CyclesConsolidatedQuery,
} from './CareerPlan.data';

import {
  CareerPlanSection,
  CareerPlanTitleWrapper,
  CareerPlanTitle,
  CareerPlanDescription,
  LoadingOverlay,
  LoadingWrapper,
} from './CareerPlan.styles';

export class CareerPlan extends Component {
  componentWillReceiveProps(nextProps) {
    this.handleIndicators(nextProps);
  }

  cyclesPerPage = 10;

  state = { activeMenu: CareerPlanMenus.CyclesFirstRange };

  handleIndicators = ({ indicators, consolidatedCycles }) => {
    if (!indicators && !consolidatedCycles) {
      return;
    }

    this.setState({ indicators, consolidatedCycles });
  };

  onMenuChange = menuItem => {
    this.setState({ activeMenu: menuItem.id });
  };

  _getEditedIndicators = (indicators, indicatorToEdit) => {
    return indicators.map(indicator => {
      if (indicator.indicatorType !== indicatorToEdit.indicatorType) {
        return indicator;
      }

      return { ...indicator, ...indicatorToEdit };
    });
  };

  _getEditedCycles = (cycles, cycleToEdit) => {
    return cycles.map(cycle => {
      if (cycle.cycle !== cycleToEdit.cycle) {
        return cycle;
      }

      return { ...cycle, ...cycleToEdit };
    });
  };

  _updateCycle = ({ cycle, indicatorType }, cb = () => {}) => {
    const currentIndicators = this.state.indicators;
    const indicator = currentIndicators.filter(i => i.indicatorType === indicatorType)[0];
    const cycles = this._getEditedCycles(indicator.cycles, cycle);
    const indicators = this._getEditedIndicators(currentIndicators, { cycles, indicatorType });

    const onStateSuccess = () => {
      cb();
      this._simulate(indicators);
    };

    this.setState({ indicators }, onStateSuccess);
  };

  onApplyChanges = ({ indicatorType, cycle }, cb) => {
    const { directSale, naturaNetwork } = cycle;

    if (naturaNetwork || directSale) {
      return this._fetchOvercoming({ indicatorType, cycle }, cb);
    }

    return this._eraseCycle({ indicatorType, cycle }, cb);
  };

  _eraseCycle = ({ indicatorType, cycle }, cb) => {
    const erasedCycle = {
      ...cycle,
      overcoming: { value: null, concept: null },
    };

    return this._updateCycle({ cycle: erasedCycle, indicatorType });
  };

  _fetchOvercoming = ({ indicatorType, cycle }, cb) => {
    const { user, client } = this.props;
    const { directSale, naturaNetwork } = cycle;

    this.setState({ hasInternalLoading: true });

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

    client
      .query(query)
      .then(({ data }) => {
        this._onFetchOvercomingSuccess({ ...data, indicatorType, cycle, cb });
      })
      .finally(() => {
        this.setState({ hasInternalLoading: false });
      });
  };

  _onFetchOvercomingSuccess = ({ cyclesOvercoming, indicatorType, cycle, cb }) => {
    const updateCycleModel = {
      indicatorType,
      cycle: {
        ...cycle,
        overcoming: cyclesOvercoming[0],
      },
    };

    this._updateCycle(updateCycleModel, cb);
  };

  _simulate = indicators => {
    const { user, client } = this.props;
    const query = {
      query: CyclesConsolidatedQuery,
      variables: {
        year: 1,
        indicators: this._getIndicatorsWithSimulatedCyles(indicators),
        sellerId: user.codigo,
      },
    };

    client
      .query(query)
      .then(this._onFetchConsolidatedOvercomingSuccess)
      .finally(() => {
        this.setState({ hasInternalLoading: false });
      });
  };

  _getIndicatorsWithSimulatedCyles = indicators => {
    return indicators.map(indicator => ({
      ...indicator,
      cycles: indicator.cycles.filter(cycle => !cycle.isClosed),
    }));
  };

  _onFetchConsolidatedOvercomingSuccess = ({ data }) => {
    if (!data) {
      return;
    }

    const { cyclesConsolidated } = data;

    const consolidatedCycles = this.state.consolidatedCycles.map(cycle => {
      const cycleOvercoming = cyclesConsolidated.filter(c => c.cycle === cycle.cycle)[0];

      if (!cycleOvercoming) {
        return cycle;
      }

      return {
        ...cycle,
        overcoming: cycleOvercoming,
      };
    });

    this.setState({ consolidatedCycles });
  };

  render() {
    const { loading, pastIndicators, pastConsolidatedCycles, concepts } = this.props;
    const { activeMenu, indicators, consolidatedCycles, hasInternalLoading } = this.state;

    return (
      <CareerPlanSection>
        <LoadingHandler loading={loading}>
          <div>
            <ReactCSSTransitionGroup
              transitionName="fadeIn"
              transitionAppearTimeout={300}
              transitionLeaveTimeout={300}
              transitionAppear
              transitionLeave
              transitionEnter={false}
            >
              {hasInternalLoading && (
                <LoadingOverlay>
                  <LoadingWrapper>
                    <Loading background="transparent" />
                  </LoadingWrapper>
                </LoadingOverlay>
              )}
            </ReactCSSTransitionGroup>
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
              onApplyChanges={this.onApplyChanges}
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
