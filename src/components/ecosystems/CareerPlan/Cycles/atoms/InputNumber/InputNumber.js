import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactNumberFormat from 'react-number-format';

export default class InputNumber extends Component {
  onValueChange = (value, event) => {
    this.props.onChange(value.floatValue || 0, event);
  };

  render() {
    return (
      <ReactNumberFormat
        {...this.props}
        type="tel"
        value={this.props.value}
        onValueChange={this.onValueChange}
        onChange={() => {}}
        isNumericString
        allowNegative={false}
        thousandSeparator="."
        decimalSeparator=","
      />
    );
  }
}

InputNumber.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
};

InputNumber.defaultProps = {
  disabled: false,
  max: 999999,
  placeholder: '',
  required: false,
  type: 'text',
};
