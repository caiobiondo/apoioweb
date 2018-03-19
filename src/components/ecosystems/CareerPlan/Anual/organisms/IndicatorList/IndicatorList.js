import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import conceptsMock from 'components/ecosystems/CareerPlan/mocks/IndicatorConceptMock';

import { IndicatorListWrapper } from './IndicatorList.styles';

import Indicator from 'components/ecosystems/CareerPlan/Anual/organisms/Indicator';

export class IndicatorList extends Component {
  constructor() {
    super();
    this.state = {
      concepts: conceptsMock,
    };
  }

  renderIndicator = indicator => {
    const { concepts } = this.state;
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
};

export const IndicatorListWithIntl = injectIntl(IndicatorList);

export default IndicatorListWithIntl;
