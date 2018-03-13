import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { translate } from 'locale';
import { Icon, FlatButton, Dialog } from 'natura-ui';

import { CareerPlanModal } from 'components/ecosystems/CareerPlan/index.styles.js';
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

    const { directSale, naturaNetwork } = props.indicatorData;
    this.state = {
      indicatorDataValues: { directSale, naturaNetwork },
      open: false,
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
      directSale: indicatorData.directSale,
      naturaNetwork: indicatorData.naturaNetwork,
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

  deleteValues = () => {
    const indicatorData = {
      directSale: '',
      naturaNetwork: '',
    };

    this.closeModal();

    return this.updateIndicatorDataValues(indicatorData, this.applyValues);
  };

  applyValues = event => {
    event && event.stopPropagation();

    const { onApply, indicatorData } = this.props;
    const { indicatorDataValues } = this.state;
    const newIndicatorData = {
      ...indicatorData,
      directSale: indicatorDataValues.directSale || 0,
      naturaNetwork: indicatorDataValues.naturaNetwork || 0,
      active: false,
    };

    return onApply(newIndicatorData);
  };

  openModal = event => {
    event.stopPropagation();
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  renderConfirmationDialog = () => {
    const title = translate('careerPlanCleanSimulation');
    const { indicator, indicatorData } = this.props;
    const { open } = this.state;
    const actions = [
      <FlatButton
        label={<FormattedMessage id="cancel" />}
        primary={false}
        onClick={this.closeModal}
        labelStyle={CareerPlanModal.label}
      />,
      <FlatButton
        label={<FormattedMessage id="remove" />}
        primary={true}
        onClick={this.deleteValues}
        labelStyle={CareerPlanModal.label}
      />,
    ];

    return (
      <Dialog
        key="clearCycleModal"
        title={title}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={this.onCloseModal}
        contentStyle={CareerPlanModal.content}
        titleStyle={CareerPlanModal.title}
        bodyStyle={CareerPlanModal.body}
        paperProps={{ style: CareerPlanModal.paper }}
      >
        <FormattedMessage
          id="careerPlanCleanSimulationContent"
          values={{
            indicatorTitle: <b>{indicator.title}</b>,
            cycle: <b>{indicatorData.cycle}</b>,
          }}
        />
      </Dialog>
    );
  };

  render() {
    const { isFilled, indicatorData, canFill } = this.props;
    const { indicatorDataValues } = this.state;

    const simulatorLabelNode = indicatorData.active ? (
      <IndicatorDataSimulatorLabel>
        <FormattedMessage id="simulator" />
      </IndicatorDataSimulatorLabel>
    ) : null;

    const IndicatorDataTrashIconNode =
      !indicatorData.active && isFilled ? (
        <IndicatorDataTrashIcon onClick={this.openModal} title={translate('delete')}>
          <Icon file="ico_trash" />
        </IndicatorDataTrashIcon>
      ) : null;

    return (
      <IndicatorDataContent active={indicatorData.active}>
        {IndicatorDataTrashIconNode}
        {simulatorLabelNode}
        <IndicatorDataRowObj>
          <IndicatorDataValue>{indicatorData.objective}</IndicatorDataValue>
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

        {this.renderConfirmationDialog()}
      </IndicatorDataContent>
    );
  }
}

export const IndicatorDataFormWithIntl = injectIntl(IndicatorDataForm);

export default IndicatorDataFormWithIntl;
