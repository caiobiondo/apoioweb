import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import IndicatorData from '../IndicatorData/IndicatorData';

import mock from './IndicatorDataMock';

import {
  IndicatorWrapper,
  IndicatorWeightWrapper,
  IndicatorWeightLabel,
  IndicatorWeightValue,
  IndicatorTitle,
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
      indicatorDataItems: mock,
    };
  }

  setActiveData = indicatorData => {
    let { indicatorDataItems } = this.state;

    indicatorDataItems = indicatorDataItems.map(item => ({
      ...item,
      active: item.id === indicatorData.id,
    }));

    return this.setState({ indicatorDataItems });
  };

  updateIndicatorData = indicatorData => {
    let { indicatorDataItems } = this.state;
    indicatorDataItems = indicatorDataItems.map(item => {
      if (item.id !== indicatorData.id) {
        return item;
      }

      return indicatorData;
    });

    this.setState({ indicatorDataItems });
  };

  isFilled = indicatorData => {
    return !indicatorData || (indicatorData.done || indicatorData.networkDone);
  };

  renderIndicatorData = (indicatorData, index) => {
    const { indicatorDataItems } = this.state;

    return (
      <IndicatorData
        indicatorData={indicatorData}
        index={index}
        key={indicatorData.id}
        canFill={this.isFilled(indicatorDataItems[index - 1])}
        isFilled={this.isFilled(indicatorData)}
        onClick={this.setActiveData}
        onApply={this.updateIndicatorData}
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
