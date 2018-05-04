import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { translate } from 'locale';
import { Icon, FlatButton, Dialog } from 'natura-ui';
import { debounce } from 'lodash';

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
  constructor({ indicator, onChange }) {
    super();
    this.indicatorFields = IndicatorFields[indicator.indicatorType];
    this.state = { showDeleteModal: false };
    this.onChangeDebounced = debounce(onChange, 200);
  }

  onChange = (value, event) => {
    const { indicatorData } = this.props;
    const { name } = event.target;
    const updatedIndicator = {
      ...indicatorData,
      [name]: value,
    };

    this.updateIndicatorData(updatedIndicator);
  };

  updateIndicatorData = indicatorData => {
    this.onChangeDebounced(indicatorData);
  };

  deleteValues = () => {
    const { indicatorData } = this.props;
    const updatedIndicator = { ...indicatorData };
    this.indicatorFields.forEach(field => {
      updatedIndicator[field] = 0;
    });

    this.closeModal();
    this.updateIndicatorData(updatedIndicator);
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
    const { indicatorData, canFill, isActive } = this.props;
    const { value, concept } = indicatorData.overcoming ? indicatorData.overcoming : {};

    return (
      <IndicatorDataContent>
        {this.renderTrashButton()}
        {this.renderSimulatorLabelNode()}
        <IndicatorDataRowObj>
          <IndicatorDataValue>
            <NumberFormat value={indicatorData.objective} />
          </IndicatorDataValue>
        </IndicatorDataRowObj>

        {this.indicatorFields.map(field => (
          <IndicatorDataRow key={field}>
            <IndicatorDataRowInputWrapper isActive={isActive} empty={!indicatorData[field]}>
              <IndicatorDataRowInput
                name={field}
                type="text"
                props={{ isActive }}
                value={indicatorData[field]}
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
            {Boolean(value) && <PercentageFormat value={value} isPercentage />}
            {!value && '-'}
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
