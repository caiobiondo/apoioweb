import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import { IndicatorFields } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';
import Indicator from '../Indicator';
import Consolidated from '../ConsolidatedIndicator';

import { IndicatorListWrapper } from './IndicatorList.styles';

export class IndicatorList extends Component {
  isCycleFilled = (cycle, indicatorType) => {
    if (!cycle) {
      return true;
    }

    return IndicatorFields[indicatorType].some(field => cycle[field] > 0 || cycle.isClosed);
  };

  renderIndicator = indicator => {
    return (
      <Indicator
        key={indicator.indicatorType}
        indicator={indicator}
        isCycleFilled={cycle => this.isCycleFilled(cycle, indicator.indicatorType)}
        {...this.props}
      />
    );
  };

  render() {
    const { indicators } = this.props;

    return (
      <div>
        <IndicatorListWrapper>{indicators.map(this.renderIndicator)}</IndicatorListWrapper>
        <Consolidated {...this.props} isCycleFilled={this.isCycleFilled} />
      </div>
    );
  }
}

IndicatorList.propTypes = {
  indicators: propTypes.array.isRequired,
};

export const IndicatorListWithIntl = injectIntl(IndicatorList);

export default IndicatorListWithIntl;
