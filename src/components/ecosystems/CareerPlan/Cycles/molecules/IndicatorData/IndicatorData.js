import React, { Component } from 'react';
import { Popover } from 'material-ui';
import { injectIntl, FormattedMessage } from 'react-intl';
import IndicatorDataForm from '../../molecules/IndicatorDataForm';

import { PercentageFormat, NumberFormat } from 'utils/numberFormat';

import {
  IndicatorDataWrapper,
  IndicatorDataSort,
  IndicatorDataSortCurrent,
  IndicatorDataContent,
  IndicatorDataRow,
  IndicatorDataRowFeatured,
  IndicatorDataRowObj,
  IndicatorDataValue,
  IndicatorDataConceptValue,
  PopoverStyles,
  PopoverContent,
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
    const { indicatorData } = this.props;
    const { value, concept } = indicatorData.overcoming ? indicatorData.overcoming : {};
    const { objective, directSale, naturaNetwork } = indicatorData;

    return (
      <IndicatorDataContent>
        <IndicatorDataRowObj>
          <IndicatorDataValue>
            <NumberFormat value={objective} />
          </IndicatorDataValue>
        </IndicatorDataRowObj>
        <IndicatorDataRow>
          <IndicatorDataValue>
            <NumberFormat value={directSale} />
          </IndicatorDataValue>
        </IndicatorDataRow>
        <IndicatorDataRow>
          <IndicatorDataValue>
            <NumberFormat value={naturaNetwork} />
          </IndicatorDataValue>
        </IndicatorDataRow>
        <IndicatorDataRowFeatured>
          <IndicatorDataValue>
            <PercentageFormat value={value} />
          </IndicatorDataValue>
        </IndicatorDataRowFeatured>
        <IndicatorDataRow>
          <IndicatorDataConceptValue concept={concept} />
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
        className="Popover"
        anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'center' }}
        onRequestClose={this.hidePopover}
        style={PopoverStyles}
      >
        <PopoverContent>
          <FormattedMessage id="careerPlanNotFilled" />
        </PopoverContent>
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
    const { indicatorData } = this.props;

    if (!indicatorData.current) {
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
          {indicatorData.cycle}
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
