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

  renderIndicatorData = (indicatorData, index) => {
    return (
      <IndicatorData
        indicatorData={indicatorData}
        index={index}
        key={indicatorData.id}
        onClick={indicatorData => this.setActiveData(indicatorData)}
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
