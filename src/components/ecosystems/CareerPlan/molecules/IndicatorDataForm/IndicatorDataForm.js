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
  constructor(props) {
    super();
    this.state = {
      indicatorDataValues: {
        done: props.indicatorData.done || '',
        networkDone: props.indicatorData.networkDone || '',
      },
    };
  }

  componentWillReceiveProps({ indicatorData }) {
    this.handleIndicatorDataBlur(indicatorData);
  }

  updateIndicatorDataValues = indicatorData => {
    if (!indicatorData) {
      return;
    }

    const indicatorDataValues = {
      done: indicatorData.done || '',
      networkDone: indicatorData.networkDone || '',
    };

    this.setState({
      ...this.state,
      indicatorDataValues,
    });
  };

  handleIndicatorDataBlur = indicatorData => {
    if (this.props.indicatorData.active && !indicatorData.active) {
      this.updateIndicatorDataValues(indicatorData);
    }
  };

  onChange = event => {
    const indicatorData = Object.assign({}, this.state.indicatorDataValues);
    const { name, value } = event.currentTarget;
    indicatorData[name] = value;

    this.updateIndicatorDataValues(indicatorData);
  };

  onApply = event => {
    event.stopPropagation();

    const { onApply } = this.props;
    const { indicatorDataValues } = this.state;
    const indicatorData = {
      ...this.props.indicatorData,
      ...indicatorDataValues,
      active: false,
    };

    return onApply(indicatorData);
  };

  render() {
    const { isFilled, indicatorData, canFill } = this.props;
    const { indicatorDataValues } = this.state;

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
        <IndicatorDataRow active={indicatorData.active} empty={!indicatorDataValues.done}>
          <IndicatorDataRowInput
            name="done"
            type="text"
            value={indicatorDataValues.done}
            onChange={this.onChange}
            disabled={!canFill}
          />
          <Icon file="ico_pencil" />
        </IndicatorDataRow>
        <IndicatorDataRow active={indicatorData.active} empty={!indicatorDataValues.networkDone}>
          <IndicatorDataRowInput
            name="networkDone"
            type="text"
            value={indicatorDataValues.networkDone}
            onChange={this.onChange}
            disabled={!canFill}
          />
          <Icon file="ico_pencil" />
        </IndicatorDataRow>
        <IndicatorDataRowAcc>
          <IndicatorDataValue>{indicatorData.accumulatedOverload || '-'}</IndicatorDataValue>
        </IndicatorDataRowAcc>

        {indicatorData.active && (
          <IndicatorDataApplyButton onClick={this.onApply}>Aplicar</IndicatorDataApplyButton>
        )}
      </IndicatorDataContent>
    );
  }
}

export const IndicatorDataFormWithIntl = injectIntl(IndicatorDataForm);

export default IndicatorDataFormWithIntl;
