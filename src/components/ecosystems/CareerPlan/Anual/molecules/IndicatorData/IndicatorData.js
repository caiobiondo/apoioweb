import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Icon } from 'natura-ui';

import { PercentageFormat, NumberFormat } from 'utils/numberFormat';

import {
  IndicatorDataWrapper,
  IndicatorDataSort,
  IndicatorDataContent,
  IndicatorDataRow,
  IndicatorDataConceptValue,
  IndicatorFloatContent,
  IndicatorFloatContentClose,
  IndicatorDataSortNumber,
  IndicatorDataRowFeatured,
  IndicatorDataValue,
  IndicatorDataSmallLabel,
  IndicatorDataSmallValue,
} from 'components/ecosystems/CareerPlan/Cycles/molecules/IndicatorData/IndicatorData.styles';

export class ChartIndicator extends Component {
  onClick = event => {
    const { onClick, indicatorData } = this.props;

    if (this.isSimulated()) {
      return onClick(indicatorData);
    }

    event.preventDefault();
  };

  onClose = event => {
    const { onClose } = this.props;
    event.stopPropagation();

    return onClose();
  };

  isSimulated = () => {
    const { indicatorData } = this.props;
    return indicatorData.directSale || indicatorData.naturaNetwork;
  };

  render() {
    const { indicator, indicatorData, setRef, showDetails } = this.props;
    const { concept, value } = indicatorData.overcoming ? indicatorData.overcoming : {};

    return (
      <IndicatorDataWrapper
        innerRef={setRef}
        showDetails={showDetails}
        editable={this.isSimulated()}
        onClick={this.onClick}
        size="5"
        bordered
        hasChart
        indicatorType={indicator.indicatorType}
      >
        <IndicatorDataSort index={indicatorData.cycle}>{indicatorData.cycle}</IndicatorDataSort>

        <IndicatorDataContent>
          <IndicatorDataRow>
            <IndicatorDataConceptValue concept={concept} />
          </IndicatorDataRow>
        </IndicatorDataContent>

        <IndicatorFloatContent>
          <IndicatorFloatContentClose onClick={this.onClose}>
            <Icon file="ico_times" />
          </IndicatorFloatContentClose>

          <IndicatorDataSortNumber>{indicatorData.cycle}</IndicatorDataSortNumber>
          <IndicatorDataRowFeatured>
            <IndicatorDataValue>
              <PercentageFormat value={value} />
            </IndicatorDataValue>
          </IndicatorDataRowFeatured>
          <IndicatorDataRow>
            <IndicatorDataConceptValue concept={concept} />
          </IndicatorDataRow>

          <IndicatorDataRow>
            <IndicatorDataSmallLabel>Objetivo</IndicatorDataSmallLabel>
            <IndicatorDataSmallValue>
              <NumberFormat value={indicatorData.objective} />
            </IndicatorDataSmallValue>
          </IndicatorDataRow>

          <IndicatorDataRow>
            <IndicatorDataSmallLabel>Real</IndicatorDataSmallLabel>
            <IndicatorDataSmallValue>
              <NumberFormat value={indicatorData.directSale} />
            </IndicatorDataSmallValue>
          </IndicatorDataRow>

          <IndicatorDataRow>
            <IndicatorDataSmallLabel>Real rede</IndicatorDataSmallLabel>
            <IndicatorDataSmallValue>
              <NumberFormat value={indicatorData.directSale} />
            </IndicatorDataSmallValue>
          </IndicatorDataRow>
        </IndicatorFloatContent>
      </IndicatorDataWrapper>
    );
  }
}

ChartIndicator.propTypes = {
  indicator: propTypes.object.isRequired,
  indicatorData: propTypes.object.isRequired,
  setRef: propTypes.func.isRequired,
  showDetails: propTypes.bool.isRequired,
};

export default ChartIndicator;
