import React from 'react';
import PropTypes from 'prop-types';

import ReactNumberFormat from 'react-number-format';

const BaseInput = props => {
  return (
    <ReactNumberFormat
      {...props}
      type="tel"
      value={props.value}
      onValueChange={(value, event) => {
        props.onChange(value.floatValue || 0, event);
      }}
      onChange={() => {}}
      isNumericString
      allowNegative={false}
      thousandSeparator="."
      decimalSeparator=","
    />
  );
};

BaseInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  error: PropTypes.array,
  errorMessage: PropTypes.string,
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

BaseInput.defaultProps = {
  disabled: false,
  max: 999999,
  placeholder: '',
  required: false,
  type: 'text',
};

export default BaseInput;
