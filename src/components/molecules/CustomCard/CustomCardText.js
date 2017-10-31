import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getSolidColor } from './utils';

const Wrapper = styled.div`
  color: ${props => getSolidColor(props.color)};
`;

const CardText = ({ children, ...props }) => <Wrapper {...props}>{children}</Wrapper>;

CardText.defaultProps = {
  color: null
};

CardText.propTypes = {
  color: PropTypes.string
};

export default CardText;
