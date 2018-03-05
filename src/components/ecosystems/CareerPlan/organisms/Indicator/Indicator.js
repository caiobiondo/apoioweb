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
    const newIndicatorData = {
      ...indicatorData,
      active: true,
    };

    indicatorDataItems = indicatorDataItems.map(item => {
      if (item.id !== indicatorData.id) {
        return {
          ...item,
          active: false,
        };
      }

      return newIndicatorData;
    });

    return this.setState({
      ...this.state,
      indicatorDataItems,
    });
  };

  updateIndicatorData = indicatorData => {
    let { indicatorDataItems } = this.state;
    const newIndicatorData = {
      ...indicatorData,
    };

    indicatorDataItems = indicatorDataItems.map(item => {
      if (item.id !== indicatorData.id) {
        return {
          ...item,
        };
      }

      return newIndicatorData;
    });

    return this.setState({
      ...this.state,
      indicatorDataItems,
    });
  };

  isFilled = indicatorData => {
    return !indicatorData || (indicatorData.real || indicatorData.networkReal);
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
        onChange={this.updateIndicatorData}
      />
    );
  };

  render() {
    const { indicatorDataItems } = this.state;

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
