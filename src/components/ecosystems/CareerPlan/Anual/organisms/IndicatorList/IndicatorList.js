import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import Indicator from 'components/ecosystems/CareerPlan/Anual/organisms/Indicator';
import ConsolidatedIndicator from 'components/ecosystems/CareerPlan/Anual/organisms/ConsolidatedIndicator';

import { IndicatorListWrapper } from './IndicatorList.styles';

export class IndicatorList extends Component {
  renderIndicator = (indicator, pastIndicator) => {
    return (
      <Indicator
        key={indicator.indicatorType}
        indicator={indicator}
        pastIndicator={pastIndicator}
        {...this.props}
      />
    );
  };

  getPastIndicator = indicatorType => {
    return this.props.pastIndicators.filter(i => i.indicatorType === indicatorType)[0];
  };

  render() {
    const { indicators } = this.props;

    return (
      <div>
        <IndicatorListWrapper>
          {indicators.map(indicator => {
            const pastIndicator = this.getPastIndicator(indicator.indicatorType);
            return this.renderIndicator(indicator, pastIndicator);
          })}
        </IndicatorListWrapper>
        <ConsolidatedIndicator {...this.props} />
      </div>
    );
  }
}

IndicatorList.propTypes = {
  indicators: propTypes.array.isRequired,
  concepts: propTypes.array.isRequired,
};

export const IndicatorListWithIntl = injectIntl(IndicatorList);

export default IndicatorListWithIntl;
