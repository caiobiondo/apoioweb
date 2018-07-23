import React from 'react';
import propTypes from 'prop-types';
import ReactNumberFormat from 'react-number-format';

export const PercentageFormat = ({ value, decimalScale, isPercentage }) => {
  const tempValue = isPercentage ? value * 100 : value;

  // truncating number 98.767 => 98.76 (decimal scale being 2)
  const formattedValue = Math.floor(tempValue * 100) / 100;

  if (value === null) {
    return value;
  }

  return (
    <ReactNumberFormat
      displayType="text"
      value={formattedValue}
      decimalScale={decimalScale}
      suffix="%"
    />
  );
};

PercentageFormat.defaultProps = {
  decimalScale: 2,
};

PercentageFormat.propTypes = {
  value: propTypes.number,
  decimalScale: propTypes.number,
};

export const NumberFormat = ({ value, decimalScale, showLastDigits }) => {
  let formattedValue = value;

  if (value === null) {
    return value;
  }

  if (showLastDigits) {
    formattedValue = parseInt(value.toString().slice(-showLastDigits), 10);
  }

  return (
    <ReactNumberFormat
      displayType="text"
      value={formattedValue}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={decimalScale}
    />
  );
};

NumberFormat.defaultProps = {
  decimalScale: 0,
};

NumberFormat.propTypes = {
  value: propTypes.number,
  decimalScale: propTypes.number,
};
