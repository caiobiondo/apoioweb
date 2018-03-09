import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';

import {
  IndicatorDataContent,
  IndicatorDataRow,
  IndicatorDataTrashIcon,
  IndicatorDataRowAcc,
  IndicatorDataRowObj,
  IndicatorDataRowInputWrapper,
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

  updateIndicatorDataValues = (indicatorData, cb) => {
    if (!indicatorData) {
      return;
    }

    const indicatorDataValues = {
      done: indicatorData.done || '',
      networkDone: indicatorData.networkDone || '',
    };

    this.setState({ indicatorDataValues }, cb);
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

  deleteValues = event => {
    event.stopPropagation();

    const indicatorData = {
      done: null,
      networkDone: null,
    };

    return this.updateIndicatorDataValues(indicatorData, this.applyValues);
  };

  applyValues = event => {
    event && event.stopPropagation();

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
    const { isFilled, indicatorData, canFill, intl } = this.props;
    const { indicatorDataValues } = this.state;

    const simulatorLabelNode = indicatorData.active ? (
      <IndicatorDataSimulatorLabel>
        <FormattedMessage id="simulator" />
      </IndicatorDataSimulatorLabel>
    ) : null;

    const IndicatorDataTrashIconNode =
      !indicatorData.active && isFilled ? (
        <IndicatorDataTrashIcon
          onClick={this.deleteValues}
          title={intl.formatMessage({ id: 'delete' })}
        >
          <Icon file="ico_trash" />
        </IndicatorDataTrashIcon>
      ) : null;

    return (
      <IndicatorDataContent active={indicatorData.active}>
        {IndicatorDataTrashIconNode}
        {simulatorLabelNode}
        <IndicatorDataRowObj>
          <IndicatorDataValue>{indicatorData.obj}</IndicatorDataValue>
        </IndicatorDataRowObj>
        <IndicatorDataRow>
          <IndicatorDataRowInputWrapper
            active={indicatorData.active}
            empty={!indicatorDataValues.done}
          >
            <IndicatorDataRowInput
              name="done"
              type="text"
              value={indicatorDataValues.done}
              onChange={this.onChange}
              disabled={!canFill}
            />
            <Icon file="ico_pencil" />
          </IndicatorDataRowInputWrapper>
        </IndicatorDataRow>
        <IndicatorDataRow>
          <IndicatorDataRowInputWrapper
            active={indicatorData.active}
            empty={!indicatorDataValues.networkDone}
          >
            <IndicatorDataRowInput
              name="networkDone"
              type="text"
              value={indicatorDataValues.networkDone}
              onChange={this.onChange}
              disabled={!canFill}
            />
            <Icon file="ico_pencil" />
          </IndicatorDataRowInputWrapper>
        </IndicatorDataRow>
        <IndicatorDataRowAcc>
          <IndicatorDataValue>{indicatorData.accumulatedOverload || '-'}</IndicatorDataValue>
        </IndicatorDataRowAcc>

        {indicatorData.active && (
          <IndicatorDataApplyButton onClick={this.applyValues}>
            <FormattedMessage id="apply" />
          </IndicatorDataApplyButton>
        )}
      </IndicatorDataContent>
    );
  }
}

export const IndicatorDataFormWithIntl = injectIntl(IndicatorDataForm);

export default IndicatorDataFormWithIntl;
