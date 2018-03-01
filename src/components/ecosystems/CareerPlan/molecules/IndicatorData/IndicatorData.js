import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';

import {
  IndicatorDataWrapper,
  IndicatorDataSort,
  IndicatorDataSortCurrent,
  IndicatorDataContent,
  IndicatorDataNumber,
  IndicatorDataTrashIcon,
  IndicatorDataNumberAcc,
  IndicatorDataNumberObj,
} from './IndicatorData.styles';

export class IndicatorData extends Component {
  onBlur = () => {
    const { onBlur, indicatorData } = this.props;
    return onBlur(indicatorData);
  };

  onFocus = () => {
    const { onFocus, indicatorData } = this.props;
    return onFocus(indicatorData, this.focusElement);
  };

  focusElement = () => {
    this.indicatorDataNode.focus();
  };

  setNode = node => {
    this.indicatorDataNode = node;
  };

  render() {
    const { indicatorData, index } = this.props;

    const currentNode = indicatorData.current ? (
      <IndicatorDataSortCurrent>Atual</IndicatorDataSortCurrent>
    ) : null;

    return (
      <IndicatorDataWrapper
        tabindex="1"
        key={indicatorData.id}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        innerRef={this.setNode}
      >
        <IndicatorDataSort active={indicatorData.active} index={index}>
          {index + 1}
          {currentNode}
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
      </IndicatorDataWrapper>
    );
  }
}

export const IndicatorDataWithIntl = injectIntl(IndicatorData);

export default IndicatorDataWithIntl;
