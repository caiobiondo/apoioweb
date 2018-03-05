import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';
import { Popover } from 'material-ui';

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
  PopoverStyles,
  PopoverContent,
  PopoverArrow,
} from './IndicatorDataForm.styles';

export class IndicatorDataForm extends Component {
  constructor() {
    super();
    this.state = {
      real: '',
      networkReal: '',
    };
  }

  componentWillReceiveProps({ indicatorData }) {
    this.updateIndicatorDataInformation(indicatorData);
  }

  updateIndicatorDataInformation = indicatorData => {
    if (!indicatorData) {
      return;
    }

    this.setState({
      ...this.state,
      real: indicatorData.real || '',
      networkReal: indicatorData.networkReal || '',
    });
  };

  onClick = event => {
    const { onClick, indicatorData } = this.props;

    if (!this.canFill()) {
      event.preventDefault();
      this.togglePopover();
      return console.log('Disabled Field');
    }

    return onClick(indicatorData);
  };

  onChange = event => {
    const { onChange, indicatorData } = this.props;
    const { name, value } = event.currentTarget;
    indicatorData[name] = value;

    onChange(indicatorData);
  };

  render() {
    const { isFilled, indicatorData, canFill } = this.props;

    const simulatorLabelNode =
      !isFilled && indicatorData.active ? (
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
          <IndicatorDataRowInput
            name="real"
            type="text"
            value={this.state.real}
            onChange={this.onChange}
            disabled={!canFill}
          />
        </IndicatorDataRow>
        <IndicatorDataRow>
          <IndicatorDataRowInput
            name="networkReal"
            type="text"
            value={this.state.networkReal}
            onChange={this.onChange}
            disabled={!canFill}
          />
        </IndicatorDataRow>
        <IndicatorDataRowAcc>
          <IndicatorDataValue>{indicatorData.accumulatedOverload || '-'}</IndicatorDataValue>
        </IndicatorDataRowAcc>
      </IndicatorDataContent>
    );
  }
}

export const IndicatorDataFormWithIntl = injectIntl(IndicatorDataForm);

export default IndicatorDataFormWithIntl;
