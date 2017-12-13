// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { getTheme } from '@entria/components';

const getBorderColor = props => {
  if (props.disabled) {
    return '1px solid #CCC';
  }
  if (props.checked) {
    return `1px solid ${getTheme().palette.primary1Color}`;
  }

  return '1px solid #5a5a5a';
};

const getBackgroundColor = props => {
  if (props.checked) {
    return props.disabled ? '#CCC' : getTheme().palette.primary1Color;
  }

  return 'transparent';
};

const Icon = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  cursor: ${props => {
    return props.disabled ? 'initial' : 'pointer';
  }};

  &:before {
    position: absolute;
    content: ' ';
    z-index: 1;
    top: 0;
    left: 0;
    transform: rotateZ(37deg);
    transform-origin: 100% 100%;
    transition: all 300ms;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    width: 4px;
    height: 10px;
    opacity: ${props => {
      return props.checked ? 1 : 0;
    }};
  }

  &:after {
    position: absolute;
    content: ' ';
    z-index: 0;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    box-sizing: border-box;
    transition: all 200ms;
    border: ${props => {
      return getBorderColor(props);
    }};
    background-color: ${props => {
      return getBackgroundColor(props);
    }};
  }
`;

type Props = {
  checked?: boolean,
  disabled?: boolean,
  onCheck?: (checked: boolean) => void,
};
type State = {
  checked: boolean,
};
class Checkbox extends Component<Props, State> {
  state = {
    checked: this.props.checked,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked === this.state.checked) {
      return;
    }

    this.setState({ checked: nextProps.checked });
  }

  onCheck = () => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    const checked = !this.state.checked;

    this.setState({ checked }, () => {
      this.props.onCheck(checked);
    });
  };

  render() {
    const { disabled } = this.props;
    const { checked } = this.state;

    return <Icon disabled={disabled} checked={checked} onClick={this.onCheck} />;
  }
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  onCheck: () => null,
};

export default Checkbox;
