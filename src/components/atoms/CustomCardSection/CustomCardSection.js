import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './CustomCardSection.styles';

const CardSection = ({ children, ...props }) => <Wrapper {...props}>{children}</Wrapper>;

CardSection.defaultProps = {
  alignItems: 'center',
  justifyContent: 'center',
};

CardSection.propTypes = {
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
};

export default CardSection;
