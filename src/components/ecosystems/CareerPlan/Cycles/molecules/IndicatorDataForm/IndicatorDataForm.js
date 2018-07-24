import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { translate } from 'locale';
import { Icon, FlatButton, Dialog } from 'natura-ui';
import { isNil } from 'lodash';

import { PercentageFormat, NumberFormat } from 'utils/numberFormat';
import {
  IndicatorFields,
  IndicatorTypesLabels,
} from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';
import CycleConcept from 'components/ecosystems/CareerPlan/atoms/CycleConcept';

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
} from './IndicatorDataForm.styles';

export class IndicatorDataForm extends Component {
  constructor({ indicator, onChange, indicatorData }) {
    super();
    this.indicatorFields = IndicatorFields[indicator.indicatorType];

    const state = { showDeleteModal: false };
    this.indicatorFields.forEach(field => {
      state[field] = indicatorData[field];
    });

    this.state = state;
  }

  onChange = (value, event) => {
    const { name } = event.target;
    this.setState({ [name]: value });
  };

  onBlur = event => {
    const { indicatorData } = this.props;
    const { name } = event.target;
    const updatedIndicatorData = {
      ...indicatorData,
      overcoming: {},
      [name]: this.state[name],
    };

    if (!this.hasChanged(indicatorData, updatedIndicatorData)) {
      return;
    }

    return this.props.onChange(updatedIndicatorData);
  };

  hasChanged = (oldIndicatorData, newIndicatorData) => {
    return this.indicatorFields.find(field => oldIndicatorData[field] !== newIndicatorData[field]);
  };

  deleteValues = () => {
    const { indicatorData } = this.props;
    const updatedIndicator = { ...indicatorData, overcoming: {} };
    this.indicatorFields.forEach(field => {
      updatedIndicator[field] = null;
      this.setState({ [field]: null });
    });

    this.closeModal();
    this.props.onChange(updatedIndicator);
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
          indicatorTitle: <b>{IndicatorTypesLabels[indicator.indicatorType]}</b>,
          cycle: (
            <b>
              <NumberFormat value={indicatorData.cycle} showLastDigits={2} />
            </b>
          ),
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

  render() {
    const {
      indicatorData,
      canFill,
      isActive,
      isFilled,
      showCycleLeftBorder,
      showCycleRightBorder,
    } = this.props;
    const { value, concept } = indicatorData.overcoming ? indicatorData.overcoming : {};

    return (
      <IndicatorDataContent
        isFilled={isFilled}
        showCycleLeftBorder={showCycleLeftBorder}
        showCycleRightBorder={showCycleRightBorder}
        isActive={isActive}
      >
        {this.renderTrashButton()}
        {this.renderSimulatorLabelNode()}
        <IndicatorDataRowObj>
          <IndicatorDataValue>
            <NumberFormat value={indicatorData.objective} />
          </IndicatorDataValue>
        </IndicatorDataRowObj>

        {this.indicatorFields.map(field => (
          <IndicatorDataRow key={field}>
            <IndicatorDataRowInputWrapper isActive={isActive} empty={isNil(indicatorData[field])}>
              <IndicatorDataRowInput
                name={field}
                type="text"
                props={{ isActive }}
                value={this.state[field]}
                onChange={this.onChange}
                onBlur={this.onBlur}
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
            {!isNil(value) ? <PercentageFormat value={value} /> : '-'}
          </IndicatorDataValue>
        </IndicatorDataRowAcc>
        <IndicatorDataRow>
          <CycleConcept concept={concept} />
        </IndicatorDataRow>
        {this.renderDeleteDialog()}
      </IndicatorDataContent>
    );
  }
}

export const IndicatorDataFormWithIntl = injectIntl(IndicatorDataForm);

export default IndicatorDataFormWithIntl;
