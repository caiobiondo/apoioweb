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
  IndicatorDataConceptValue,
  IndicatorDataApplyButton,
} from './IndicatorDataForm.styles';

export class IndicatorDataForm extends Component {
  constructor(props) {
    super();

    const { directSale, naturaNetwork } = props.indicatorData;
    this.state = {
      indicatorDataValues: {
        directSale: directSale,
        naturaNetwork: naturaNetwork,
      },
      showDeleteModal: false,
    };
  }

  componentWillReceiveProps({ isActive }) {
    this.handleIndicatorDataBlur(isActive);
  }

  updateIndicatorDataValues = (indicatorData, cb) => {
    const indicatorDataValues = {
      directSale: indicatorData.directSale,
      naturaNetwork: indicatorData.naturaNetwork,
    };

    this.setState({ indicatorDataValues }, cb);
  };

  handleIndicatorDataBlur = isActive => {
    if (this.props.isActive && !isActive) {
      this.updateIndicatorDataValues(this.props.indicatorData);
    }
  };

  onChange = (value, event) => {
    const indicatorData = Object.assign({}, this.state.indicatorDataValues);
    const { name } = event.target;
    indicatorData[name] = value;

    this.updateIndicatorDataValues(indicatorData);
  };

  deleteValues = () => {
    const indicatorData = {
      directSale: 0,
      naturaNetwork: 0,
    };

    this.closeModal();

    return this.updateIndicatorDataValues(indicatorData, this.applyValues);
  };

  applyValues = event => {
    event && event.stopPropagation();

    const { onApply, indicatorData } = this.props;
    const { indicatorDataValues } = this.state;

    return onApply({
      ...indicatorData,
      directSale: indicatorDataValues.directSale,
      naturaNetwork: indicatorDataValues.naturaNetwork,
    });
  };

  openModal = event => {
    event.stopPropagation();
    this.setState({ showDeleteModal: true });
  };

  closeModal = () => {
    this.setState({ showDeleteModal: false });
  };

  renderDeleteDialog() {
    const title = translate('careerPlanCleanSimulation');
    const { indicator, indicatorData } = this.props;
    const { showDeleteModal } = this.state;
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
        open={showDeleteModal}
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
  }

  render() {
    const { isFilled, indicatorData, canFill, isActive, isCycleFilled } = this.props;
    const { indicatorDataValues } = this.state;

    const simulatorLabelNode = isActive ? (
      <IndicatorDataSimulatorLabel>
        <FormattedMessage id="simulator" />
      </IndicatorDataSimulatorLabel>
    ) : null;

    const IndicatorDataTrashIconNode =
      !isActive && isFilled ? (
        <IndicatorDataTrashIcon onClick={this.openModal} title={translate('delete')}>
          <Icon file="ico_trash" />
        </IndicatorDataTrashIcon>
      ) : null;

    return (
      <IndicatorDataContent active={isActive}>
        {IndicatorDataTrashIconNode}
        {simulatorLabelNode}
        <IndicatorDataRowObj>
          <IndicatorDataValue>{indicatorData.objective}</IndicatorDataValue>
        </IndicatorDataRowObj>
        <IndicatorDataRow>
          <IndicatorDataRowInputWrapper active={isActive} empty={!indicatorDataValues.directSale}>
            <IndicatorDataRowInput
              name="directSale"
              type="text"
              props={{ isActive }}
              value={indicatorDataValues.directSale}
              onChange={this.onChange}
              disabled={!canFill}
              maxLength={7}
              thousandSeparator="."
            />
            <Icon file="ico_pencil" />
          </IndicatorDataRowInputWrapper>
        </IndicatorDataRow>
        <IndicatorDataRow>
          <IndicatorDataRowInputWrapper
            active={isActive}
            empty={!indicatorDataValues.naturaNetwork}
          >
            <IndicatorDataRowInput
              name="naturaNetwork"
              type="text"
              props={{ isActive }}
              value={indicatorDataValues.naturaNetwork}
              onChange={this.onChange}
              disabled={!canFill}
              maxLength={7}
              thousandSeparator="."
            />
            <Icon file="ico_pencil" />
          </IndicatorDataRowInputWrapper>
        </IndicatorDataRow>
        <IndicatorDataRowAcc>
          <IndicatorDataValue>{indicatorData.accumulatedOverload || '-'}</IndicatorDataValue>
        </IndicatorDataRowAcc>
        <IndicatorDataRow>
          <IndicatorDataConceptValue concept={indicatorData.consolidated.value} />
        </IndicatorDataRow>

        {isActive && (
          <IndicatorDataApplyButton
            onClick={this.applyValues}
            disabled={!isCycleFilled(indicatorDataValues)}
          >
            <FormattedMessage id="apply" />
          </IndicatorDataApplyButton>
        )}

        {this.renderDeleteDialog()}
      </IndicatorDataContent>
    );
  }
}

export const IndicatorDataFormWithIntl = injectIntl(IndicatorDataForm);

export default IndicatorDataFormWithIntl;
