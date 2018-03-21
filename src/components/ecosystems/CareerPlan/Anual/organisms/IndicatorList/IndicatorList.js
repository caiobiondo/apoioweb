import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import Indicator from 'components/ecosystems/CareerPlan/Anual/organisms/Indicator';

import { IndicatorListWrapper } from './IndicatorList.styles';

export class IndicatorList extends Component {
  renderIndicator = (indicator, pastIndicator) => {
    const { concepts } = this.props;
    return (
      <Indicator
        key={indicator.indicatorType}
        pastIndicator={pastIndicator}
        indicator={indicator}
        concepts={concepts}
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
