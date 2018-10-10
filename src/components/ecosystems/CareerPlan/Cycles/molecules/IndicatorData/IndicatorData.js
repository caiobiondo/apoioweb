import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import IndicatorDataForm from '../../molecules/IndicatorDataForm';
import CycleConcept from 'components/ecosystems/CareerPlan/atoms/CycleConcept';
import { IndicatorFields } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';
import { PercentageFormat, NumberFormat } from 'utils/numberFormat';
import Popover from 'components/ecosystems/CareerPlan/molecules/Popover';

import {
  IndicatorDataWrapper,
  IndicatorDataSort,
  IndicatorDataSortCurrent,
  IndicatorDataContent,
  IndicatorDataRow,
  IndicatorDataRowFeatured,
  IndicatorDataRowObj,
  IndicatorDataValue,
} from './IndicatorData.styles';

export class IndicatorData extends Component {
  state = {};

  onClick = event => {
    const { onClick, indicatorData } = this.props;

    if (this.canFill()) {
      return onClick(indicatorData);
    }

    event.preventDefault();
    this.showPopover();
  };

  setNode = node => {
    this.indicatorDataNode = node;
  };

  canFill = () => {
    const { indicatorData, canFill } = this.props;
    return !indicatorData.isClosed && canFill;
  };

  hidePopover = () => {
    this.setState({ showPopover: false });
  };

  showPopover = () => {
    this.setState({ showPopover: true });
  };

  renderDisabled() {
    const { indicatorData, indicator } = this.props;
    const { value, concept } = indicatorData.overcoming ? indicatorData.overcoming : {};
    const { objective } = indicatorData;

    return (
      <IndicatorDataContent>
        <IndicatorDataRowObj>
          <IndicatorDataValue>
            <NumberFormat value={objective} />
          </IndicatorDataValue>
        </IndicatorDataRowObj>

        {IndicatorFields[indicator.indicatorType].map(field => (
          <IndicatorDataRow key={field}>
            <IndicatorDataValue>
              <NumberFormat value={indicatorData[field]} />
            </IndicatorDataValue>
          </IndicatorDataRow>
        ))}

        <IndicatorDataRowFeatured>
          <IndicatorDataValue>
            <PercentageFormat value={value} />
          </IndicatorDataValue>
        </IndicatorDataRowFeatured>
        <IndicatorDataRow>
          <CycleConcept concept={concept} />
        </IndicatorDataRow>
      </IndicatorDataContent>
    );
  }

  renderPopover() {
    const { indicatorData } = this.props;

    if (indicatorData.isClosed) {
      return null;
    }

    return (
      <Popover
        open={this.state.showPopover}
        anchorEl={this.indicatorDataNode}
        onRequestClose={this.hidePopover}
        anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'center' }}
      >
        <FormattedMessage id="careerPlanNotFilled" />
      </Popover>
    );
  }

  renderContentNode() {
    const { indicatorData, activeCycle } = this.props;

    if (indicatorData.isClosed) {
      return this.renderDisabled();
    }

    return <IndicatorDataForm {...this.props} isActive={indicatorData.cycle === activeCycle} />;
  }

  renderCurrentLabel() {
    const { isCurrentCycle } = this.props;

    if (!isCurrentCycle) {
      return;
    }

    return (
      <IndicatorDataSortCurrent>
        <FormattedMessage id="current" />
      </IndicatorDataSortCurrent>
    );
  }

  render() {
    const { indicator, indicatorData, activeCycle } = this.props;

    return (
      <IndicatorDataWrapper
        indicatorType={indicator.indicatorType}
        editable={!indicatorData.isClosed}
        isActive={indicatorData.cycle === activeCycle}
        key={indicatorData.cycle}
        onClick={this.onClick}
        innerRef={this.setNode}
      >
        <IndicatorDataSort index={indicatorData.cycle}>
          <NumberFormat value={indicatorData.cycle} showLastDigits={2} />
          {this.renderCurrentLabel()}
        </IndicatorDataSort>

        {this.renderContentNode()}

        {this.renderPopover()}
      </IndicatorDataWrapper>
    );
  }
}

export const IndicatorWithIntl = injectIntl(IndicatorData);

export default IndicatorWithIntl;
