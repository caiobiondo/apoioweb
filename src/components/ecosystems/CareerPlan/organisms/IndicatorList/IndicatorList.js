import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import Indicator from '../Indicator';

import { IndicatorListWrapper } from './IndicatorList.styles';

export class IndicatorList extends Component {
  render() {
    const { indicators } = this.props;

    return (
      <IndicatorListWrapper>{indicators.map(indicator => <Indicator />)}</IndicatorListWrapper>
    );
  }
}

export const IndicatorListWithIntl = injectIntl(IndicatorList);

export default IndicatorListWithIntl;
