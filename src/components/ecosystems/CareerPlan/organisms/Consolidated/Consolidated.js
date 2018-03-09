import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import mock from '../Indicator/IndicatorDataMock';
import { ConsolidatedWrapper } from './Consolidated.styles';

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
  IndicatorDataContent,
  IndicatorDataSort,
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
        <IndicatorDataSort index={index}>{index + 1}</IndicatorDataSort>
        <IndicatorDataContent>
          <IndicatorDataRowFeatured>
            <IndicatorDataValue>{indicatorData.accumulatedOverload}</IndicatorDataValue>
          </IndicatorDataRowFeatured>
          <IndicatorDataRowFeatured>
            <IndicatorDataValue>{indicatorData.accumulatedOverload}</IndicatorDataValue>
          </IndicatorDataRowFeatured>
        </IndicatorDataContent>
      </IndicatorDataWrapper>
    );
  };

  render() {
    const { indicatorDataItems } = this.state;

    return (
      <IndicatorWrapper>
        <ConsolidatedWrapper>
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
        </ConsolidatedWrapper>
      </IndicatorWrapper>
    );
  }
}

export const ConsolidatedWithIntl = injectIntl(Consolidated);

export default ConsolidatedWithIntl;
