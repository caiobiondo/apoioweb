import React, { Component } from 'react';
import propTypes from 'prop-types';

import {
  IndicatorDataWrapper,
  IndicatorDataSort,
  IndicatorDataContent,
  IndicatorDataRow,
  IndicatorDataConceptValue,
} from 'components/ecosystems/CareerPlan/Cycles/molecules/IndicatorData/IndicatorData.styles';

export class ChartIndicator extends Component {
  render() {
    const { indicatorData, setRef } = this.props;

    return (
      <IndicatorDataWrapper
        innerRef={setRef}
        editable={false}
        onClick={this.onClick}
        size="5"
        bordered
      >
        <IndicatorDataSort index={indicatorData.cycle}>{indicatorData.cycle}</IndicatorDataSort>

        <IndicatorDataContent>
          <IndicatorDataRow>
            <IndicatorDataConceptValue concept={indicatorData.consolidated.value} />
          </IndicatorDataRow>
        </IndicatorDataContent>
      </IndicatorDataWrapper>
    );
  }
}

ChartIndicator.propTypes = {
  indicators: propTypes.array.isRequired,
};

export default ChartIndicator;
