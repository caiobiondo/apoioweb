import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { translate } from 'locale';
import { Icon, FlatButton, Dialog } from 'natura-ui';

import { PercentageFormat } from 'utils/numberFormat';
import { IndicatorFields } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';

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
  constructor({ indicatorData, indicator }) {
    super();
    this.indicatorFields = IndicatorFields[indicator.indicatorType];

    const indicatorDataValues = {};
    this.indicatorFields.forEach(field => {
      indicatorDataValues[field] = indicatorData[field];
    });

    this.state = {
      indicatorDataValues,
      showDeleteModal: false,
    };
  }

  componentWillReceiveProps({ isActive }) {
    this.handleIndicatorDataBlur(isActive);
  }

  updateIndicatorDataValues = (indicatorData, cb) => {
    const indicatorDataValues = {};
    this.indicatorFields.forEach(field => {
      indicatorDataValues[field] = indicatorData[field];
    });

    this.setState({ indicatorDataValues }, cb);
  };

  handleIndicatorDataBlur = isActive => {
    if (!this.props.isActive || isActive) {
      return;
    }

    this.updateIndicatorDataValues(this.props.indicatorData);
  };

  onChange = (value, event) => {
    const indicatorData = Object.assign({}, this.state.indicatorDataValues);
    const { name } = event.target;
    indicatorData[name] = value;

    this.updateIndicatorDataValues(indicatorData);
  };

  deleteValues = () => {
    const indicatorData = {};
    this.indicatorFields.forEach(field => {
      indicatorData[field] = 0;
    });

    this.closeModal();

    return this.updateIndicatorDataValues(indicatorData, this.applyValues);
  };

  applyValues = event => {
    event && event.stopPropagation();
    const { onApply, indicatorData } = this.props;

    const values = {};
    this.indicatorFields.forEach(field => {
      values[field] = this.state.indicatorDataValues[field];
    });

    return onApply({
      ...indicatorData,
      ...values,
    });
  };

  openModal = event => {
    event.stopPropagation();
    this.setState({ showDeleteModal: true });
  };

  closeModal = () => {
    this.setState({ showDeleteModal: false });
  };

  getDialogActions = () => {
    return [
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
  };

  renderDialogContent() {
    const { indicator, indicatorData } = this.props;

    return (
      <FormattedMessage
        id="careerPlanCleanSimulationContent"
        values={{
          indicatorTitle: <b>{indicator.title}</b>,
          cycle: <b>{indicatorData.cycle}</b>,
        }}
      />
    );
  }

  renderDeleteDialog() {
    const title = translate('careerPlanCleanSimulation');
    const { showDeleteModal } = this.state;
    const actions = this.getDialogActions();

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
        {this.renderDialogContent()}
      </Dialog>
    );
  }

  renderSimulatorLabelNode() {
    if (!this.props.isActive) {
      return;
    }

    return (
      <IndicatorDataSimulatorLabel>
        <FormattedMessage id="simulator" />
      </IndicatorDataSimulatorLabel>
    );
  }

  renderTrashButton() {
    const { isActive, isFilled } = this.props;

    if (isActive || !isFilled) {
      return;
    }

    return (
      <IndicatorDataTrashIcon onClick={this.openModal} title={translate('delete')}>
        <Icon file="ico_trash" />
      </IndicatorDataTrashIcon>
    );
  }

  renderApplyButton() {
    const { isActive, isCycleFilled } = this.props;
    const { indicatorDataValues } = this.state;

    if (!isActive) {
      return;
    }

    return (
      <IndicatorDataApplyButton
        onClick={this.applyValues}
        disabled={!isCycleFilled(indicatorDataValues)}
      >
        <FormattedMessage id="apply" />
      </IndicatorDataApplyButton>
    );
  }

  render() {
    const { indicatorData, canFill, isActive } = this.props;
    const { value, concept } = indicatorData.overcoming ? indicatorData.overcoming : {};

    return (
      <IndicatorDataContent>
        {this.renderTrashButton()}
        {this.renderSimulatorLabelNode()}
        <IndicatorDataRowObj>
          <IndicatorDataValue>{indicatorData.objective}</IndicatorDataValue>
        </IndicatorDataRowObj>

        {this.indicatorFields.map(field => (
          <IndicatorDataRow key={field}>
            <IndicatorDataRowInputWrapper
              isActive={isActive}
              empty={!this.state.indicatorDataValues[field]}
            >
              <IndicatorDataRowInput
                name={field}
                type="text"
                props={{ isActive }}
                value={this.state.indicatorDataValues[field]}
                onChange={this.onChange}
                disabled={!canFill}
                maxLength={7}
                thousandSeparator="."
              />
              <Icon file="ico_pencil" />
            </IndicatorDataRowInputWrapper>
          </IndicatorDataRow>
        ))}

        <IndicatorDataRowAcc>
          <IndicatorDataValue>
            {Boolean(value) && <PercentageFormat value={value} />}
            {!value && '-'}
          </IndicatorDataValue>
        </IndicatorDataRowAcc>
        <IndicatorDataRow>
          <IndicatorDataConceptValue concept={concept} />
        </IndicatorDataRow>
        {this.renderApplyButton()}
        {this.renderDeleteDialog()}
      </IndicatorDataContent>
    );
  }
}

export const IndicatorDataFormWithIntl = injectIntl(IndicatorDataForm);

export default IndicatorDataFormWithIntl;
