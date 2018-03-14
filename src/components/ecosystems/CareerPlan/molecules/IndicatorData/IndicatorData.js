import React, { Component } from 'react';
import { Popover } from 'material-ui';
import IndicatorDataForm from '../../molecules/IndicatorDataForm';

import {
  IndicatorDataWrapper,
  IndicatorDataSort,
  IndicatorDataSortCurrent,
  IndicatorDataContent,
  IndicatorDataRow,
  IndicatorDataRowFeatured,
  IndicatorDataRowObj,
  IndicatorDataValue,
  PopoverStyles,
  PopoverContent,
} from './IndicatorData.styles';

export class IndicatorData extends Component {
  state = {};

  onClick = event => {
    const { onClick, indicatorData } = this.props;

    if (!this.canFill()) {
      event.preventDefault();
      this.togglePopover();
      return console.log('Disabled Field');
    }

    return onClick(indicatorData);
  };

  setNode = node => {
    this.indicatorDataNode = node;
  };

  canFill = () => {
    const { indicatorData, canFill } = this.props;
    return !indicatorData.isClosed && canFill;
  };

  handleRequestClose = () => {
    this.setState({ showPopover: false });
  };

  togglePopover = () => {
    const { showPopover } = this.state;
    this.setState({ showPopover: !showPopover });
  };

  renderDisabled() {
    const { indicatorData } = this.props;

    return (
      <IndicatorDataContent>
        <IndicatorDataRowObj>
          <IndicatorDataValue>{indicatorData.objective}</IndicatorDataValue>
        </IndicatorDataRowObj>
        <IndicatorDataRow>
          <IndicatorDataValue>{indicatorData.directSale}</IndicatorDataValue>
        </IndicatorDataRow>
        <IndicatorDataRow>
          <IndicatorDataValue>{indicatorData.naturaNetwork}</IndicatorDataValue>
        </IndicatorDataRow>
        <IndicatorDataRowFeatured>
          <IndicatorDataValue>{indicatorData.overcoming}</IndicatorDataValue>
        </IndicatorDataRowFeatured>
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
        show={this.state.showPopover}
        anchorEl={this.indicatorDataNode}
        className="Popover"
        anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'center' }}
        onRequestClose={this.handleRequestClose}
        style={PopoverStyles}
      >
        <PopoverContent>O simulador deve ser preenchido sequencialmente.</PopoverContent>
      </Popover>
    );
  }

  render() {
    const { indicator, indicatorData, activeCycle } = this.props;

    const currentNode = indicatorData.current ? (
      <IndicatorDataSortCurrent>Atual</IndicatorDataSortCurrent>
    ) : null;

    const contentNode = !indicatorData.isClosed ? (
      <IndicatorDataForm {...this.props} isActive={indicatorData.cycle === activeCycle} />
    ) : (
      this.renderDisabled()
    );

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
          {currentNode}
        </IndicatorDataSort>

        {contentNode}

        {this.renderPopover()}
      </IndicatorDataWrapper>
    );
  }
}

export default IndicatorData;
