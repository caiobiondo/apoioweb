import React from 'react';
import ReactNumberFormat from 'react-number-format';

export const PercentageFormat = ({ value, decimalScale }) => {
  return (
    <ReactNumberFormat displayType="text" value={value} decimalScale={decimalScale} suffix="%" />
  );
};

PercentageFormat.defaultProps = {
  decimalScale: 2,
};

export const NumberFormat = ({ value, decimalScale }) => {
  return (
    <ReactNumberFormat
      displayType="text"
      value={value}
      thousandSeparator="."
      decimalSeparator=","
      fixedDecimalScale
    />
  );
};
