import React from 'react';
import PropTypes from 'prop-types';

import InputMask from 'react-input-mask';

const generateMask = (max = 999999) => {
  let generatedMask = '';
  const maxNumberSize = (max + '').length;

  for (let i = maxNumberSize - 1; i >= 0; i--) {
    generatedMask += '9';
  }

  return generatedMask;
};

const BaseInput = props => {
  const mask = generateMask(props.max);

  return (
    <InputMask {...props} value={props.value} onChange={props.onChange} mask={mask} maskChar="" />
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
