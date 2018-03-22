import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Popover } from 'material-ui';
import { Icon } from 'natura-ui';

import { PercentageFormat } from 'utils/numberFormat';

import { IndicatorTypesLabels } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';
import { IndicatorConceptsLabels } from 'components/ecosystems/CareerPlan/enums/IndicatorConcepts';
import { ConsolidateWarningIcon } from './ConsolidatedIndicatorData.styles';

import {
  IndicatorDataWrapper,
  IndicatorDataContent,
  IndicatorDataSort,
  IndicatorDataRowFeatured,
  IndicatorDataValue,
  PopoverStyles,
  PopoverContent,
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
        className="Popover"
        anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'center' }}
        onRequestClose={this.hidePopover}
        style={PopoverStyles}
      >
        <PopoverContent>
          <FormattedMessage
            id="careerPlanConsolidatedIndicatorError"
            values={{
              indicatorNames: <strong>{this.getIndicatorNames()}</strong>,
              cycle: <strong>5</strong>,
            }}
          />
        </PopoverContent>
      </Popover>
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
    if (!this.props.current) {
      return;
    }

    return (
      <IndicatorDataSortCurrent>
        <FormattedMessage id="current" />
      </IndicatorDataSortCurrent>
    );
  }

  render() {
    const { cycle, isValid, isActive } = this.props;

    const conceptValue = isActive ? null : isValid ? IndicatorConceptsLabels[cycle.value] : '-';
    const overcomingValue = isActive ? null : isValid ? (
      <PercentageFormat value={cycle.overcoming} />
    ) : (
      '-'
    );

    return (
      <IndicatorDataWrapper
        key={cycle.cycle}
        isActive={isActive}
        onClick={this.onClick}
        innerRef={this.setNode}
      >
        <IndicatorDataSort>
          {cycle.cycle}
          {this.renderCurrentLabel()}
        </IndicatorDataSort>
        <IndicatorDataContent>
          <IndicatorDataRowFeatured>
            <IndicatorDataValue>{overcomingValue}</IndicatorDataValue>
          </IndicatorDataRowFeatured>
          <IndicatorDataRowConcept concept={cycle.value}>
            <IndicatorDataValue>{conceptValue}</IndicatorDataValue>
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
