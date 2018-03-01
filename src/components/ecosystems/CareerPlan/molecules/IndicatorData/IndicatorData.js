import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';

import {
  IndicatorDataWrapper,
  IndicatorDataSort,
  IndicatorDataSortCurrent,
  IndicatorDataContent,
  IndicatorDataRow,
  IndicatorDataTrashIcon,
  IndicatorDataRowAcc,
  IndicatorDataRowObj,
  IndicatorDataRowInput,
  IndicatorDataSimulatorLabel,
  IndicatorDataValue,
} from './IndicatorData.styles';

export class IndicatorData extends Component {
  onClick = () => {
    const { onClick, indicatorData } = this.props;
    return onClick(indicatorData);
  };

  focusElement = () => {
    this.indicatorDataNode.focus();
  };

  setNode = node => {
    this.indicatorDataNode = node;
  };

  isFake = () => {
    const { indicatorData } = this.props;

    return !indicatorData.preLoaded;
  };

  isFilled = () => {
    const { indicatorData } = this.props;

    return (
      this.isFake() &&
      (indicatorData.real || indicatorData.networkReal || indicatorData.accumulatedOverload)
    );
  };

  renderForm() {
    const { indicatorData } = this.props;

    const simulatorLabelNode =
      !this.isFilled() && indicatorData.active ? (
        <IndicatorDataSimulatorLabel>Simulador</IndicatorDataSimulatorLabel>
      ) : null;

    const IndicatorDataTrashIconNode = !indicatorData.active ? (
      <IndicatorDataTrashIcon title="Deletar">
        <Icon file="ico_trash" />
      </IndicatorDataTrashIcon>
    ) : null;

    return (
      <IndicatorDataContent>
        <IndicatorDataRow>
          {IndicatorDataTrashIconNode}
          {simulatorLabelNode}
        </IndicatorDataRow>
        <IndicatorDataRowObj>
          <IndicatorDataValue>{indicatorData.obj}</IndicatorDataValue>
        </IndicatorDataRowObj>
        <IndicatorDataRow>
          <IndicatorDataRowInput value="165165" />
        </IndicatorDataRow>
        <IndicatorDataRow>
          <IndicatorDataRowInput value="165165" />
        </IndicatorDataRow>
        <IndicatorDataRowAcc>{indicatorData.accumulatedOverload}</IndicatorDataRowAcc>
        <span IndicatorTableItemStatus />
      </IndicatorDataContent>
    );
  }

  renderDisabled() {
    const { indicatorData } = this.props;

    return (
      <IndicatorDataContent>
        <IndicatorDataRow />
        <IndicatorDataRowObj>
          <IndicatorDataValue>{indicatorData.obj}</IndicatorDataValue>
        </IndicatorDataRowObj>
        <IndicatorDataRow>
          <IndicatorDataValue>{indicatorData.real}</IndicatorDataValue>
        </IndicatorDataRow>
        <IndicatorDataRow>
          <IndicatorDataValue>{indicatorData.networkReal}</IndicatorDataValue>
        </IndicatorDataRow>
        <IndicatorDataRowAcc>
          <IndicatorDataValue>{indicatorData.accumulatedOverload}</IndicatorDataValue>
        </IndicatorDataRowAcc>
        <span IndicatorTableItemStatus />
      </IndicatorDataContent>
    );
  }

  render() {
    const { indicatorData, index } = this.props;

    const currentNode = indicatorData.current ? (
      <IndicatorDataSortCurrent>Atual</IndicatorDataSortCurrent>
    ) : null;

    const contentNode = this.isFake() ? this.renderForm() : this.renderDisabled();

    return (
      <IndicatorDataWrapper
        active={indicatorData.active}
        key={indicatorData.id}
        onClick={this.onClick}
        innerRef={this.setNode}
      >
        <IndicatorDataSort index={index}>
          {index + 1}
          {currentNode}
        </IndicatorDataSort>

        {contentNode}
      </IndicatorDataWrapper>
    );
  }
}

export const IndicatorDataWithIntl = injectIntl(IndicatorData);

export default IndicatorDataWithIntl;
