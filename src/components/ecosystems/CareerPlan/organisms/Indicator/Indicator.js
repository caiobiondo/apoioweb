import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import IndicatorData from '../../molecules/IndicatorData/IndicatorData';

import mock from './IndicatorDataMock';

import {
  IndicatorWrapper,
  IndicatorWeightWrapper,
  IndicatorWeightLabel,
  IndicatorWeightValue,
  IndicatorTitle,
  IndicatorInfo,
  IndicatorContentWrapper,
  IndicatorTableHeader,
  IndicatorTableHeaderItem,
  IndicatorTableHeaderItemFeatured,
  IndicatorTableContent,
  IndicatorTableContentWapper,
} from './Indicator.styles';

export class Indicator extends Component {
  constructor() {
    super();

    this.state = {
      indicatorDataItems: mock.map(item => ({
        ...item,
        preLoaded: Boolean(item.indicator.directSale && item.indicator.naturaNetwork),
      })),
    };
  }

  setActiveData = indicatorData => {
    let { indicatorDataItems } = this.state;

    indicatorDataItems = indicatorDataItems.map(item => ({
      ...item,
      active: item.cycle === indicatorData.cycle,
    }));

    return this.setState({ indicatorDataItems });
  };

  updateIndicatorData = indicatorData => {
    let { indicatorDataItems } = this.state;
    indicatorDataItems = indicatorDataItems.map(item => {
      if (item.cycle !== indicatorData.cycle) {
        return item;
      }

      return indicatorData;
    });

    this.setState({ indicatorDataItems });
  };

  isFilled = indicatorData => {
    return (
      !indicatorData ||
      (indicatorData.indicator.directSale || indicatorData.indicator.naturaNetwork)
    );
  };

  renderIndicatorData = (indicatorData, index) => {
    const { indicatorDataItems } = this.state;

    return (
      <IndicatorData
        indicatorData={indicatorData}
        index={index}
        key={indicatorData.cycle}
        canFill={this.isFilled(indicatorDataItems[index - 1])}
        isFilled={this.isFilled(indicatorData)}
        onClick={this.setActiveData}
        onApply={this.updateIndicatorData}
        indicatorTitle="Volume de pontos"
      />
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

        <IndicatorTitle>Volume de Pontos</IndicatorTitle>
        <IndicatorInfo>
          <FormattedMessage id="information" />
        </IndicatorInfo>
        <IndicatorContentWrapper>
          <IndicatorTableHeader>
            <IndicatorTableHeaderItemFeatured>Obj</IndicatorTableHeaderItemFeatured>
            <IndicatorTableHeaderItem>Real.</IndicatorTableHeaderItem>
            <IndicatorTableHeaderItem>Real rede</IndicatorTableHeaderItem>
            <IndicatorTableHeaderItemFeatured>Superação acumulada</IndicatorTableHeaderItemFeatured>
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

export const IndicatorWithIntl = injectIntl(Indicator);

export default IndicatorWithIntl;
