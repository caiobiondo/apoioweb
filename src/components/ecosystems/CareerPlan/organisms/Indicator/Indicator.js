import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import IndicatorData from '../../molecules/IndicatorData/IndicatorData';

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
      indicatorDataItems: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4, current: true },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
      ],
    };
  }

  setActiveData = ({ indicatorData, active }, cb) => {
    let { indicatorDataItems } = this.state;
    const newIndicatorData = {
      ...indicatorData,
      active,
    };

    indicatorDataItems = indicatorDataItems.map(item => {
      if (item.id !== indicatorData.id) {
        return item;
      }

      return newIndicatorData;
    });

    const newState = {
      ...this.state,
      indicatorDataItems,
    };

    return this.setState(newState, cb);
  };

  renderIndicatorData = (indicatorData, index) => {
    return (
      <IndicatorData
        indicatorData={indicatorData}
        index={index}
        key={indicatorData.id}
        onFocus={(indicatorData, cb) => this.setActiveData({ indicatorData, active: true }, cb)}
        onBlur={(indicatorData, cb) => this.setActiveData({ indicatorData, active: false })}
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
