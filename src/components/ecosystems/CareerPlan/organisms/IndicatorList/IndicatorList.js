import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import Indicator from '../Indicator';
import Consolidated from '../Consolidated/Consolidated';

import { IndicatorListWrapper } from './IndicatorList.styles';

export class IndicatorList extends Component {
  constructor(props) {
    super();
    this.state = {
      indicators: props.indicators,
    };
  }

  updateIndicator = indicator => {
    let { indicators } = this.state;

    indicators = indicators.map(item => {
      if (item.indicatorType !== indicator.indicatorType) {
        return item;
      }

      return indicator;
    });

    this.setState({ indicators });
  };

  render() {
    const { range } = this.props;
    const { indicators } = this.state;

    return (
      <div>
        <IndicatorListWrapper>
          {indicators.map(indicator => (
            <Indicator
              key={indicator.id}
              indicator={indicator}
              range={range}
              onChange={this.updateIndicator}
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
