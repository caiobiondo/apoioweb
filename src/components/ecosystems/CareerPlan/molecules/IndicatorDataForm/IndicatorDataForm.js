import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';

import {
  IndicatorDataContent,
  IndicatorDataRow,
  IndicatorDataTrashIcon,
  IndicatorDataRowAcc,
  IndicatorDataRowObj,
  IndicatorDataRowInput,
  IndicatorDataSimulatorLabel,
  IndicatorDataValue,
  IndicatorDataApplyButton,
} from './IndicatorDataForm.styles';

export class IndicatorDataForm extends Component {
  constructor() {
    super();
    this.state = {
      done: '',
      networkDone: '',
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
      done: indicatorData.done || '',
      networkDone: indicatorData.networkDone || '',
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

    const simulatorLabelNode = indicatorData.active ? (
      <IndicatorDataSimulatorLabel>Simulador</IndicatorDataSimulatorLabel>
    ) : null;

    const IndicatorDataTrashIconNode =
      !indicatorData.active && isFilled ? (
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
        <IndicatorDataRow active={indicatorData.active} empty={!this.state.done}>
          <IndicatorDataRowInput
            name="done"
            type="text"
            value={this.state.done}
            onChange={this.onChange}
            disabled={!canFill}
          />
          <Icon file="ico_pencil" />
        </IndicatorDataRow>
        <IndicatorDataRow active={indicatorData.active} empty={!this.state.networkDone}>
          <IndicatorDataRowInput
            name="networkDone"
            type="text"
            value={this.state.networkDone}
            onChange={this.onChange}
            disabled={!canFill}
          />
          <Icon file="ico_pencil" />
        </IndicatorDataRow>
        <IndicatorDataRowAcc>
          <IndicatorDataValue>{indicatorData.accumulatedOverload || '-'}</IndicatorDataValue>
        </IndicatorDataRowAcc>

        {indicatorData.active && <IndicatorDataApplyButton>Aplicar</IndicatorDataApplyButton>}
      </IndicatorDataContent>
    );
  }
}

export const IndicatorDataFormWithIntl = injectIntl(IndicatorDataForm);

export default IndicatorDataFormWithIntl;
