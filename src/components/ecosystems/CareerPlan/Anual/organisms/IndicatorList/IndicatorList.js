import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import conceptsMock from 'components/ecosystems/CareerPlan/mocks/IndicatorConceptMock';

import Indicator from 'components/ecosystems/CareerPlan/Anual/organisms/Indicator';

import { IndicatorListWrapper } from './IndicatorList.styles';

export class IndicatorList extends Component {
  renderIndicator = indicator => {
    const { concepts } = this.props;
    return <Indicator key={indicator.indicatorType} indicator={indicator} concepts={concepts} />;
  };

  render() {
    const { indicators } = this.props;

    return (
      <div>
        <IndicatorListWrapper>{indicators.map(this.renderIndicator)}</IndicatorListWrapper>
      </div>
    );
  }
}

IndicatorList.propTypes = {
  indicators: propTypes.array.isRequired,
  concepts: propTypes.array,
};

IndicatorList.defaultProps = {
  concepts: conceptsMock,
};

export const IndicatorListWithIntl = injectIntl(IndicatorList);

export default IndicatorListWithIntl;
