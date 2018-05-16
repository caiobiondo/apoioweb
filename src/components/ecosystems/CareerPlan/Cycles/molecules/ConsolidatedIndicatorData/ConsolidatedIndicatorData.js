import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';

import { PercentageFormat, NumberFormat } from 'utils/numberFormat';
import Popover from 'components/ecosystems/CareerPlan/molecules/Popover';

import { IndicatorTypesLabels } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';
import { IndicatorConceptsLabels } from 'components/ecosystems/CareerPlan/enums/IndicatorConcepts';
import { ConsolidateWarningIcon } from './ConsolidatedIndicatorData.styles';

import {
  IndicatorDataWrapper,
  IndicatorDataContent,
  IndicatorDataSort,
  IndicatorDataRowFeatured,
  IndicatorDataValue,
  IndicatorDataSortCurrent,
} from '../../molecules/IndicatorData/IndicatorData.styles';

import { IndicatorDataRowConcept } from '../../molecules/IndicatorDataForm/IndicatorDataForm.styles';

export class ConsolidatedIndicatorData extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onClick = event => {
    if (this.props.isValid) {
      return;
    }

    event.preventDefault();
    this.showPopover();
  };

  setNode = node => {
    this.cycleNode = node;
  };

  hidePopover = () => {
    this.setState({ showPopover: false });
  };

  showPopover = () => {
    this.setState({ showPopover: true });
  };

  getIndicatorNames = () => {
    return Object.values(IndicatorTypesLabels).join(', ');
  };

  renderPopover = cycle => {
    const { isActive } = this.props;
    const { showPopover } = this.state;

    if (!isActive) {
      return;
    }

    return (
      <Popover
        open={showPopover}
        anchorEl={this.cycleNode}
        anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'center' }}
        onRequestClose={this.hidePopover}
      >
        {this.renderError(cycle)}
      </Popover>
    );
  };

  renderError = cycle => {
    const error = this.props.isFilled
      ? 'careerPlanConsolidatedIndicatorUpdateError'
      : 'careerPlanConsolidatedIndicatorError';

    return (
      <FormattedMessage
        id={error}
        values={{
          indicatorNames: <strong>{this.getIndicatorNames()}</strong>,
          cycle: <strong>{cycle.cycle}</strong>,
        }}
      />
    );
  };

  renderWarningIcon() {
    if (!this.props.isActive) {
      return;
    }

    return (
      <ConsolidateWarningIcon>
        <Icon file="ico_warning_info" />
      </ConsolidateWarningIcon>
    );
  }

  renderCurrentLabel() {
    if (!this.props.isCurrentCycle) {
      return;
    }

    return (
      <IndicatorDataSortCurrent>
        <FormattedMessage id="current" />
      </IndicatorDataSortCurrent>
    );
  }

  renderConceptValue() {
    const { cycle, isActive, isValid } = this.props;

    if (isActive) {
      return;
    }

    return (isValid && IndicatorConceptsLabels[cycle.overcoming.concept]) || '-';
  }

  renderOvercoming() {
    const { cycle, isActive, isValid } = this.props;

    if (isActive) {
      return;
    }

    return cycle.overcoming.value && isValid ? (
      <PercentageFormat value={cycle.overcoming.value} />
    ) : (
      '-'
    );
  }

  render() {
    const { cycle, isActive } = this.props;

    return (
      <IndicatorDataWrapper
        key={cycle.cycle}
        isActive={isActive}
        onClick={this.onClick}
        innerRef={this.setNode}
      >
        <IndicatorDataSort>
          <NumberFormat showLastDigits={2} value={cycle.cycle} />
          {this.renderCurrentLabel()}
        </IndicatorDataSort>
        <IndicatorDataContent>
          <IndicatorDataRowFeatured>
            <IndicatorDataValue>{this.renderOvercoming()}</IndicatorDataValue>
          </IndicatorDataRowFeatured>
          <IndicatorDataRowConcept concept={cycle.overcoming.concept}>
            <IndicatorDataValue>{this.renderConceptValue()}</IndicatorDataValue>
          </IndicatorDataRowConcept>
        </IndicatorDataContent>
        {this.renderWarningIcon()}
        {this.renderPopover(cycle)}
      </IndicatorDataWrapper>
    );
  }
}

export const ConsolidatedIndicatorDataWithIntl = injectIntl(ConsolidatedIndicatorData);

export default ConsolidatedIndicatorDataWithIntl;
