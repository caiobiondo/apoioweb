import React from 'react';
import { FloatingActionButton, Icon } from 'natura-ui';
import { IconWrapper, Wrapper } from './CustomerButton.styles';

const OrderAddButton = props => {
  return (
    <Wrapper onClick={() => props.action()} remove={props.remove}>
      <FloatingActionButton iconWrapper={IconWrapper}>
        <Icon file="ico_times" />
      </FloatingActionButton>
    </Wrapper>
  );
};

export default OrderAddButton;
