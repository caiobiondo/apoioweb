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
        directSale: props.indicatorData.directSale || '',
        naturaNetwork: props.indicatorData.naturaNetwork || '',
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
      directSale: indicatorData.directSale || '',
      naturaNetwork: indicatorData.naturaNetwork || '',
    };

    this.setState({ indicatorDataValues }, cb);
  };

  handleIndicatorDataBlur = indicatorData => {
    if (this.props.indicatorData.active && !indicatorData.active) {
      this.updateIndicatorDataValues(indicatorData.indicator);
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
      directSale: null,
      naturaNetwork: null,
    };

    return this.updateIndicatorDataValues(indicatorData, this.applyValues);
  };

  applyValues = event => {
    event && event.stopPropagation();

    const { onApply } = this.props;
    const { indicatorDataValues } = this.state;
    const indicatorData = {
      ...this.props.indicatorData,
      indicator: { ...this.props.indicatorData.indicator, ...indicatorDataValues },
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
          <IndicatorDataValue>{indicatorData.indicator.objective}</IndicatorDataValue>
        </IndicatorDataRowObj>
        <IndicatorDataRow>
          <IndicatorDataRowInputWrapper
            active={indicatorData.active}
            empty={!indicatorDataValues.directSale}
          >
            <IndicatorDataRowInput
              name="directSale"
              type="text"
              value={indicatorDataValues.directSale}
              onChange={this.onChange}
              disabled={!canFill}
            />
            <Icon file="ico_pencil" />
          </IndicatorDataRowInputWrapper>
        </IndicatorDataRow>
        <IndicatorDataRow>
          <IndicatorDataRowInputWrapper
            active={indicatorData.active}
            empty={!indicatorDataValues.naturaNetwork}
          >
            <IndicatorDataRowInput
              name="naturaNetwork"
              type="text"
              value={indicatorDataValues.naturaNetwork}
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
