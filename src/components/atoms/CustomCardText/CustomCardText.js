import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './CustomCardText.styles';

const CustomCardText = ({ children, ...props }) => <Wrapper {...props}>{children}</Wrapper>;

CustomCardText.defaultProps = {
  color: null,
};

CustomCardText.propTypes = {
  color: PropTypes.string,
};

export default CustomCardText;
