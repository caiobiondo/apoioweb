import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import {} from './Consolidated.styles';

import mock from '../Indicator/IndicatorDataMock';

import {
  IndicatorWrapper,
  IndicatorWeightWrapper,
  IndicatorWeightLabel,
  IndicatorWeightValue,
  IndicatorTitle,
  IndicatorContentWrapper,
  IndicatorTableHeader,
  IndicatorTableHeaderItemFeatured,
  IndicatorTableContent,
  IndicatorTableContentWapper,
} from '../Indicator/Indicator.styles';

import {
  IndicatorDataWrapper,
  IndicatorDataRow,
  IndicatorDataRowFeatured,
  IndicatorDataValue,
} from '../../molecules/IndicatorData/IndicatorData.styles';

export class Consolidated extends Component {
  constructor() {
    super();

    this.state = {
      indicatorDataItems: mock,
    };
  }

  renderIndicatorData = (indicatorData, index) => {
    const { indicatorDataItems } = this.state;

    return (
      <IndicatorDataWrapper>
        <IndicatorDataRow />
        <IndicatorDataRowFeatured>
          <IndicatorDataValue>{indicatorData.accumulatedOverload}</IndicatorDataValue>
          <IndicatorDataValue>{indicatorData.accumulatedOverload}</IndicatorDataValue>
        </IndicatorDataRowFeatured>
      </IndicatorDataWrapper>
    );
  };

  render() {
    const { indicatorDataItems } = this.state;

    return (
      <IndicatorWrapper>
        <IndicatorWeightWrapper>
          <IndicatorWeightLabel>
            <FormattedMessage id="weight" />
          </IndicatorWeightLabel>
          <IndicatorWeightValue>50</IndicatorWeightValue>
        </IndicatorWeightWrapper>

        <IndicatorTitle>
          <FormattedMessage id="consolidated" />
        </IndicatorTitle>
        <IndicatorContentWrapper>
          <IndicatorTableHeader>
            <IndicatorTableHeaderItemFeatured>
              <FormattedMessage id="finalResult" />
            </IndicatorTableHeaderItemFeatured>
            <IndicatorTableHeaderItemFeatured>
              <FormattedMessage id="rating" />
            </IndicatorTableHeaderItemFeatured>
          </IndicatorTableHeader>

          <IndicatorTableContentWapper>
            <IndicatorTableContent>
              {indicatorDataItems.map(this.renderIndicatorData)}
            </IndicatorTableContent>
          </IndicatorTableContentWapper>
        </IndicatorContentWrapper>
      </IndicatorWrapper>
    );
  }
}

export const ConsolidatedWithIntl = injectIntl(Consolidated);

export default ConsolidatedWithIntl;
