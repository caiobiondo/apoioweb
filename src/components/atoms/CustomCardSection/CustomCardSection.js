import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './CustomCardSection.styles';

const CardSection = ({ children, ...props }) => <Wrapper {...props}>{children}</Wrapper>;

CardSection.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center'
};

CardSection.propTypes = {
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string
};

export default CardSection;
