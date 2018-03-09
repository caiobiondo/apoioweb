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
  PopoverArrow,
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

  isFake = () => {
    const { indicatorData } = this.props;
    return !indicatorData.preLoaded;
  };

  canFill = () => {
    const { indicatorData, canFill } = this.props;
    return !indicatorData.preLoaded && canFill;
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  togglePopover = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  renderDisabled() {
    const { indicatorData } = this.props;

    return (
      <IndicatorDataContent>
        <IndicatorDataRow />
        <IndicatorDataRowObj>
          <IndicatorDataValue>{indicatorData.obj}</IndicatorDataValue>
        </IndicatorDataRowObj>
        <IndicatorDataRow>
          <IndicatorDataValue>{indicatorData.done}</IndicatorDataValue>
        </IndicatorDataRow>
        <IndicatorDataRow>
          <IndicatorDataValue>{indicatorData.networkDone}</IndicatorDataValue>
        </IndicatorDataRow>
        <IndicatorDataRowFeatured>
          <IndicatorDataValue>{indicatorData.accumulatedOverload}</IndicatorDataValue>
        </IndicatorDataRowFeatured>
      </IndicatorDataContent>
    );
  }

  renderPopover() {
    return (
      <Popover
        open={this.state.open}
        anchorEl={this.indicatorDataNode}
        className="Popover"
        anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'center' }}
        onRequestClose={this.handleRequestClose}
        style={PopoverStyles}
      >
        <PopoverContent>
          O simulador deve ser preenchido sequencialmente. <PopoverArrow />
        </PopoverContent>
      </Popover>
    );
  }

  render() {
    const { indicatorData, index } = this.props;

    const currentNode = indicatorData.current ? (
      <IndicatorDataSortCurrent>Atual</IndicatorDataSortCurrent>
    ) : null;

    const contentNode = this.isFake() ? (
      <IndicatorDataForm {...this.props} />
    ) : (
      this.renderDisabled()
    );

    return (
      <IndicatorDataWrapper
        active={indicatorData.active}
        key={indicatorData.id}
        onClick={this.onClick}
        innerRef={this.setNode}
      >
        <IndicatorDataSort index={index}>
          {index + 1}
          {currentNode}
        </IndicatorDataSort>

        {contentNode}

        {this.renderPopover()}
      </IndicatorDataWrapper>
    );
  }
}

export default IndicatorData;
