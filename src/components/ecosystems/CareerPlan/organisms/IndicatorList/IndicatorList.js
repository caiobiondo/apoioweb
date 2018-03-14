import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import Indicator from '../Indicator';
import Consolidated from '../Consolidated/Consolidated';

import { IndicatorListWrapper } from './IndicatorList.styles';

export class IndicatorList extends Component {
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
              {...this.props}
            />
          ))}
        </IndicatorListWrapper>
        <Consolidated indicators={indicators} />
      </div>
    );
  }
}

IndicatorList.propTypes = {
  indicators: propTypes.array.isRequired,
};

export const IndicatorListWithIntl = injectIntl(IndicatorList);

export default IndicatorListWithIntl;
