import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import Indicator from '../Indicator';
import Consolidated from '../ConsolidatedIndicator';

import { IndicatorListWrapper } from './IndicatorList.styles';

export class IndicatorList extends Component {
  renderIndicator = indicator => {
    return (
      <Indicator
        {...this.props}
        key={indicator.indicatorType}
        indicator={indicator}
        isCycleFilled={cycle => this.props.isCycleFilled(cycle, indicator.indicatorType)}
      />
    );
  };

  render() {
    const { indicators, isCycleFilled } = this.props;

    return (
      <div>
        <IndicatorListWrapper>{indicators.map(this.renderIndicator)}</IndicatorListWrapper>
        <Consolidated {...this.props} isCycleFilled={isCycleFilled} />
      </div>
    );
  }
}

IndicatorList.propTypes = {
  indicators: propTypes.array.isRequired,
};

export const IndicatorListWithIntl = injectIntl(IndicatorList);

export default IndicatorListWithIntl;
