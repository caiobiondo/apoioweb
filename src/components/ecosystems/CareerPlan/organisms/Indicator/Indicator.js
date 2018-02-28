import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';

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
  IndicatorTableItem,
  IndicatorTableItemSort,
  IndicatorTableItemContent,
  IndicatorTableItemTrashIcon,
  IndicatorTableItemNumber,
  IndicatorTableContentWapper,
  IndicatorTableItemNumberAcc,
  IndicatorTableItemNumberObj,
} from './Indicator.styles';

export class Indicator extends Component {
  renderIndicatorTableItem = (indicatorTableItem, index) => {
    return (
      <IndicatorTableItem key={indicatorTableItem.id}>
        <IndicatorTableItemSort>{index + 1}</IndicatorTableItemSort>
        <IndicatorTableItemContent>
          <IndicatorTableItemNumber>
            <IndicatorTableItemTrashIcon title="Deletar">
              <Icon file="ico_trash" />
            </IndicatorTableItemTrashIcon>
          </IndicatorTableItemNumber>
          <IndicatorTableItemNumberObj>165.165</IndicatorTableItemNumberObj>
          <IndicatorTableItemNumber>166.576</IndicatorTableItemNumber>
          <IndicatorTableItemNumber>2.157</IndicatorTableItemNumber>
          <IndicatorTableItemNumberAcc>102,16%</IndicatorTableItemNumberAcc>
          <span IndicatorTableItemStatus />
        </IndicatorTableItemContent>
      </IndicatorTableItem>
    );
  };

  render() {
    const indicatorItems = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
    ];

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
              <IndicatorTableHeaderItemAccOrObj>Obj</IndicatorTableHeaderItemAccOrObj>
              <IndicatorTableHeaderItem>Real.</IndicatorTableHeaderItem>
              <IndicatorTableHeaderItem>Real rede</IndicatorTableHeaderItem>
              <IndicatorTableHeaderItemAccOrObj>
                Superação acumulada
              </IndicatorTableHeaderItemAccOrObj>
            </IndicatorTableHeader>
            <IndicatorTableContentWapper>
              <IndicatorTableContent>
                {indicatorItems.map(this.renderIndicatorTableItem)}
              </IndicatorTableContent>
            </IndicatorTableContentWapper>
          </div>
        </IndicatorContentWrapper>
      </IndicatorWrapper>
    );
  }
}

export const IndicatorWithIntl = injectIntl(Indicator);

export default IndicatorWithIntl;
