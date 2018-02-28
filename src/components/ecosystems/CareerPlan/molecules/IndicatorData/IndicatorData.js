import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';

import {
  IndicatorDataWrapper,
  IndicatorDataWrapperActive,
  IndicatorDataSort,
  IndicatorDataSortCurrent,
  IndicatorDataContent,
  IndicatorDataNumber,
  IndicatorDataTrashIcon,
  IndicatorDataNumberAcc,
  IndicatorDataNumberObj,
} from './IndicatorData.styles';

export class IndicatorData extends Component {
  render() {
    const { indicatorData, index } = this.props;

    const IndicatorDataWrapperComponent = indicatorData.active
      ? IndicatorDataWrapperActive
      : IndicatorDataWrapper;

    return (
      <IndicatorDataWrapperComponent key={indicatorData.id}>
        <IndicatorDataSort active={indicatorData.active} index={index}>
          {index + 1}

          {indicatorData.current && <IndicatorDataSortCurrent>Atual</IndicatorDataSortCurrent>}
        </IndicatorDataSort>
        <IndicatorDataContent>
          <IndicatorDataNumber>
            <IndicatorDataTrashIcon title="Deletar">
              <Icon file="ico_trash" />
            </IndicatorDataTrashIcon>
          </IndicatorDataNumber>
          <IndicatorDataNumberObj>165.165</IndicatorDataNumberObj>
          <IndicatorDataNumber>166.576</IndicatorDataNumber>
          <IndicatorDataNumber>2.157</IndicatorDataNumber>
          <IndicatorDataNumberAcc>102,16%</IndicatorDataNumberAcc>
          <span IndicatorTableItemStatus />
        </IndicatorDataContent>
      </IndicatorDataWrapperComponent>
    );
  }
}

export const IndicatorDataWithIntl = injectIntl(IndicatorData);

export default IndicatorDataWithIntl;
