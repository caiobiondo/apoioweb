import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 20px;
  margin-left: 40px;
  width: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  @media (min-width: 1024px) {
    padding: 10px 50px;
    margin-left: 0;
    width: 100%;

    &:not(:last-child) {
      border-bottom: none;
      border-right: 1px solid #eee;
    }
  }
`;

const CardSection = ({ children, ...props }) => <Wrapper {...props}>{children}</Wrapper>;

CardSection.defaultProps = {
  justifyContent: 'space-between',
  alignItems: 'flex-start'
};

CardSection.propTypes = {
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string
};

export default CardSection;
