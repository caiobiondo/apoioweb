import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import Indicator from '../Indicator';
import Consolidated from '../Consolidated/Consolidated';

import { IndicatorListWrapper } from './IndicatorList.styles';

export class IndicatorList extends Component {
  isCycleFilled = cycle => {
    if (!cycle) {
      return true;
    }

    const { naturaNetwork, directSale } = cycle;

    return naturaNetwork !== 0 || directSale || 0;
  };

  render() {
    const { indicators } = this.props;

    return (
      <div>
        <IndicatorListWrapper>
          {indicators.map(indicator => (
            <Indicator
              key={indicator.indicatorType}
              indicator={indicator}
              onChange={this.updateIndicator}
              isCycleFilled={this.isCycleFilled}
              {...this.props}
            />
          ))}
        </IndicatorListWrapper>
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
