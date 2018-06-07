import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { graphql, withApollo } from 'react-apollo';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { omit } from 'lodash';

import CareerPlanMenus from 'components/ecosystems/CareerPlan/enums/CareerPlanMenus';
import { IndicatorFields } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';
import { SnackbarComponent } from 'components/ecosystems/CareerPlan/molecules/Snackbar';

import { Loading } from 'natura-ui';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
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

  isCycleFilled = (cycle, indicatorType) => {
    if (!cycle) {
      return true;
    }

    return IndicatorFields[indicatorType].some(field => cycle[field] > 0 || cycle.isClosed);
  };

  onIndicatorChange = indicator => {
    return Promise.resolve(this._updateIndicator(indicator));
  };

  fetchOvercomingCycles = indicator => {
    const { user, client, businessModel, country } = this.props;
    const editedCycles = this._getFetchOvercomingCycles(indicator);
    const { indicatorType } = indicator;
    const cycleArray = editedCycles.map(cycle => cycle.cycle);

    const query = {
      query: OvercomingQuery,
      variables: {
        sellerId: user.codigo,
        naturaNetwork: editedCycles.map(cycle => cycle.naturaNetwork || 0),
        directSale: editedCycles.map(cycle => cycle.directSale || 0),
        indicatorType,
        cycleArray,
        businessModel,
        country,
      },
    };

    return client.query(query).then(({ data }) => {
      const { cyclesOvercoming } = data;
      this._onFetchOvercomingSuccess({ cyclesOvercoming, indicatorType });
    });
  };

  fetchConsolidatedCycles = () => {
    this._setInternalLoading(true);

    const { indicators } = this.state;
    const { user, client, businessModel, country, currentYear } = this.props;
    const query = {
      query: CyclesConsolidatedQuery,
      variables: {
        year: currentYear,
        indicators: this._omitTypename(this._getIndicatorsWithSimulatedCyles(indicators)),
        sellerId: user.codigo,
        businessModel,
        country,
      },
    };

    return client
      .query(query)
      .then(this._onFetchConsolidatedOvercomingSuccess)
      .finally(() => this._setInternalLoading(false));
  };

  resetConsolidatedCycle = cycle => {
    const consolidatedCycles = this.state.consolidatedCycles.map(c => {
      if (c.cycle !== cycle.cycle) {
        return c;
      }

      return {
        ...cycle,
        overcoming: {},
      };
    });

    this.setState({ consolidatedCycles });
  };

  _updateIndicator = indicator => {
    const indicators = this._getEditedIndicators(indicator);
    this.setState({ indicators });
  };

  _getEditedIndicators = indicatorToEdit => {
    const currentIndicators = this.state.indicators;

    return currentIndicators.map(indicator => {
      if (indicator.indicatorType !== indicatorToEdit.indicatorType) {
        return indicator;
      }

      return { ...indicator, ...indicatorToEdit };
    });
  };

  _setInternalLoading(hasInternalLoading) {
    this.setState({ hasInternalLoading });
  }

  _getFetchOvercomingCycles = ({ cycles, indicatorType }) => {
    return cycles.filter(cycle => !cycle.isClosed && this.isCycleFilled(cycle, indicatorType));
  };

  _onFetchOvercomingSuccess = ({ cyclesOvercoming, indicatorType }) => {
    const indicator = this.state.indicators.find(
      indicator => indicator.indicatorType === indicatorType,
    );

    const cycles = indicator.cycles.map(cycle => {
      const cycleOvercoming = cyclesOvercoming.find(c => c.cycle === cycle.cycle);
      if (!cycleOvercoming) {
        return cycle;
      }

      return {
        ...cycle,
        overcoming: cycleOvercoming,
      };
    });

    this._updateIndicator({
      ...indicator,
      cycles,
    });
  };

  _getIndicatorsWithSimulatedCyles = indicators => {
    return indicators.map(({ indicatorType, significance, cycles }) => ({
      indicatorType,
      significance,
      cycles: cycles.filter(cycle => !cycle.isClosed),
    }));
  };

  _omitTypename = indicators => {
    return indicators.map(indicator =>
      omit(
        {
          ...indicator,
          cycles: indicator.cycles.map(cycle =>
            omit(
              {
                ...cycle,
                overcoming: omit(
                  {
                    ...cycle.overcoming,
                  },
                  '__typename',
                ),
              },
              '__typename',
            ),
          ),
        },
        '__typename',
      ),
    );
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

  renderCareerPlanComponents() {
    const { pastIndicators, pastConsolidatedCycles, concepts, currentCycle } = this.props;
    const { activeMenu, indicators, consolidatedCycles, hasInternalLoading } = this.state;

    if (!indicators || indicators.length === 0) {
      return (
        <EmptyList
          icon="ico_warning_info"
          titleId="careerPlanEmptyList"
          descriptionId="careerPlanEmptyListDescription"
        />
      );
    }

    return (
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
          onIndicatorChange={this.onIndicatorChange}
          onIndicatorSave={this.fetchOvercomingCycles}
          currentCycle={currentCycle}
          isCycleFilled={this.isCycleFilled}
          onConsolidatedUpdate={this.fetchConsolidatedCycles}
          resetConsolidatedCycle={this.resetConsolidatedCycle}
        />

        <SnackbarComponent />
      </div>
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <CareerPlanSection>
        <LoadingHandler loading={loading}>{this.renderCareerPlanComponents()}</LoadingHandler>
      </CareerPlanSection>
    );
  }
}

export const CareerPlanWithIntl = injectIntl(CareerPlan);

export default withApollo(
  graphql(IndicatorListQuery, IndicatorListQueryOptions)(CareerPlanWithIntl),
);
