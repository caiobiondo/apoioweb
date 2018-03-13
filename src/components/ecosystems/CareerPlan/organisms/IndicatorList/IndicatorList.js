import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import Indicator from '../Indicator';
import Consolidated from '../Consolidated/Consolidated';

import { IndicatorListWrapper } from './IndicatorList.styles';

export class IndicatorList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { indicators, range } = this.props;

    return (
      <div>
        <IndicatorListWrapper>
          {indicators.map(indicator => (
            <Indicator key={indicator.id} indicator={indicator} range={range} />
          ))}
        </IndicatorListWrapper>
        <Consolidated />
      </div>
    );
  }
}

IndicatorList.propTypes = {
  indicators: propTypes.array.isRequired,
  range: propTypes.shape({
    from: propTypes.number,
    to: propTypes.number,
  }),
};

IndicatorList.defaultProps = {
  range: {
    from: 0,
    to: 10,
  },
};

export const IndicatorListWithIntl = injectIntl(IndicatorList);

export default IndicatorListWithIntl;
