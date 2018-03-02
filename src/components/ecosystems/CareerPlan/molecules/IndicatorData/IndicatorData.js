import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';
import { Popover } from 'material-ui';

import {
  IndicatorDataWrapper,
  IndicatorDataSort,
  IndicatorDataSortCurrent,
  IndicatorDataContent,
  IndicatorDataRow,
  IndicatorDataTrashIcon,
  IndicatorDataRowAcc,
  IndicatorDataRowObj,
  IndicatorDataRowInput,
  IndicatorDataSimulatorLabel,
  IndicatorDataValue,
  PopoverStyles,
  PopoverContent,
  PopoverArrow,
} from './IndicatorData.styles';

export class IndicatorData extends Component {
  constructor() {
    super();
    this.state = {
      real: '',
      networkReal: '',
    };
  }

  componentWillReceiveProps({ indicatorData }) {
    this.updateIndicatorDataInformation(indicatorData);
  }

  updateIndicatorDataInformation = indicatorData => {
    if (!indicatorData) {
      return;
    }

    this.setState({
      ...this.state,
      real: indicatorData.real || '',
      networkReal: indicatorData.networkReal || '',
    });
  };

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
    this.setState({
      ...this.state,
      open: false,
    });
  };

  togglePopover = () => {
    const { open } = this.state;
    this.setState({ ...this.state, open: !open });
  };

  onChange = event => {
    const { onChange, indicatorData } = this.props;
    const { name, value } = event.currentTarget;
    indicatorData[name] = value;

    onChange(indicatorData);
  };

  renderForm() {
    const { isFilled, indicatorData } = this.props;

    const simulatorLabelNode =
      !isFilled && indicatorData.active ? (
        <IndicatorDataSimulatorLabel>Simulador</IndicatorDataSimulatorLabel>
      ) : null;

    const IndicatorDataTrashIconNode = !indicatorData.active ? (
      <IndicatorDataTrashIcon title="Deletar">
        <Icon file="ico_trash" />
      </IndicatorDataTrashIcon>
    ) : null;

    return (
      <IndicatorDataContent>
        <IndicatorDataRow>
          {IndicatorDataTrashIconNode}
          {simulatorLabelNode}
        </IndicatorDataRow>
        <IndicatorDataRowObj>
          <IndicatorDataValue>{indicatorData.obj}</IndicatorDataValue>
        </IndicatorDataRowObj>
        <IndicatorDataRow>
          <IndicatorDataRowInput
            name="real"
            type="text"
            value={this.state.real}
            onChange={this.onChange}
            disabled={!this.canFill()}
          />
        </IndicatorDataRow>
        <IndicatorDataRow>
          <IndicatorDataRowInput
            name="networkReal"
            type="text"
            value={this.state.networkReal}
            onChange={this.onChange}
            disabled={!this.canFill()}
          />
        </IndicatorDataRow>
        <IndicatorDataRowAcc>
          <IndicatorDataValue>{indicatorData.accumulatedOverload || '-'}</IndicatorDataValue>
        </IndicatorDataRowAcc>
        {this.renderPopover()}
      </IndicatorDataContent>
    );
  }

  renderDisabled() {
    const { indicatorData } = this.props;

    return (
      <IndicatorDataContent>
        <IndicatorDataRow />
        <IndicatorDataRowObj>
          <IndicatorDataValue>{indicatorData.obj}</IndicatorDataValue>
        </IndicatorDataRowObj>
        <IndicatorDataRow>
          <IndicatorDataValue>{indicatorData.real}</IndicatorDataValue>
        </IndicatorDataRow>
        <IndicatorDataRow>
          <IndicatorDataValue>{indicatorData.networkReal}</IndicatorDataValue>
        </IndicatorDataRow>
        <IndicatorDataRowAcc>
          <IndicatorDataValue>{indicatorData.accumulatedOverload}</IndicatorDataValue>
        </IndicatorDataRowAcc>
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
        targetOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
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

    const contentNode = this.isFake() ? this.renderForm() : this.renderDisabled();

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
      </IndicatorDataWrapper>
    );
  }
}

export const IndicatorDataWithIntl = injectIntl(IndicatorData);

export default IndicatorDataWithIntl;
