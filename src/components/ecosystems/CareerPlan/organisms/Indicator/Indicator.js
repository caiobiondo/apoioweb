import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import {
  IndicatorWrapper,
  IndicatorWeightWrapper,
  IndicatorWeightLabel,
  IndicatorWeightValue,
  IndicatorTitle,
  IndicatorContentWrapper,
  IndicatorTableHeader,
  IndicatorTableContent,
  IndicatorTableItem,
  IndicatorTableItemSort,
  IndicatorTableItemContent,
  IndicatorTableItemTrashIcon,
  IndicatorTableItemNumber,
} from './Indicator.styles';

export class Indicator extends Component {
  render() {
    return (
      <IndicatorWrapper>
        <IndicatorWeightWrapper>
          <IndicatorWeightLabel>Peso</IndicatorWeightLabel>
          <IndicatorWeightValue>50</IndicatorWeightValue>
        </IndicatorWeightWrapper>

        <IndicatorTitle>Volume de Pontos</IndicatorTitle>
        <IndicatorContentWrapper>
          <div IndicatorTable>
            <IndicatorTableHeader>
              <li IndicatorTableHeaderItem>Obj</li>
              <li IndicatorTableHeaderItem>Real.</li>
              <li IndicatorTableHeaderItem>Real rede</li>
              <li IndicatorTableHeaderItem>Superação acumulada</li>
            </IndicatorTableHeader>
            <IndicatorTableContent>
              <IndicatorTableItem>
                <IndicatorTableItemSort>1</IndicatorTableItemSort>
                <IndicatorTableItemContent>
                  <IndicatorTableItemTrashIcon />
                  <IndicatorTableItemNumber>165.165</IndicatorTableItemNumber>
                  <IndicatorTableItemNumber>166.576</IndicatorTableItemNumber>
                  <IndicatorTableItemNumber>2.157</IndicatorTableItemNumber>
                  <IndicatorTableItemNumber>102,16%</IndicatorTableItemNumber>
                  <span IndicatorTableItemStatus />
                </IndicatorTableItemContent>
              </IndicatorTableItem>
            </IndicatorTableContent>
          </div>
        </IndicatorContentWrapper>
      </IndicatorWrapper>
    );
  }
}

export const IndicatorWithIntl = injectIntl(Indicator);

export default IndicatorWithIntl;
