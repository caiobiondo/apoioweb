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
  IndicatorTableHeaderItemAccOrObj,
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

    return this.setState({
      ...this.state,
      indicatorDataItems,
    });
  };

  updateIndicatorData = indicatorData => {
    let { indicatorDataItems } = this.state;
    indicatorDataItems = indicatorDataItems.map(item => {
      if (item.id !== indicatorData.id) {
        return item;
      }

      return indicatorData;
    });

    this.setState({
      ...this.state,
      indicatorDataItems,
    });
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

    console.log(indicatorDataItems);

    return (
      <IndicatorWrapper>
        <IndicatorWeightWrapper>
          <IndicatorWeightLabel>Peso</IndicatorWeightLabel>
          <IndicatorWeightValue>50</IndicatorWeightValue>
        </IndicatorWeightWrapper>

        <IndicatorTitle>Volume de Pontos</IndicatorTitle>
        <IndicatorContentWrapper>
          <IndicatorTableHeader>
            <IndicatorTableHeaderItemAccOrObj>Obj</IndicatorTableHeaderItemAccOrObj>
            <IndicatorTableHeaderItem>Real.</IndicatorTableHeaderItem>
            <IndicatorTableHeaderItem>Real rede</IndicatorTableHeaderItem>
            <IndicatorTableHeaderItemAccOrObj>Superação acumulada</IndicatorTableHeaderItemAccOrObj>
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
