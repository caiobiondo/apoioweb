import React from 'react';
import { FloatingActionButton, Icon } from 'natura-ui';
import { IconWrapper, Wrapper } from './CustomerButton.styles';

const OrderAddButton = props => {
  const icon = props.remove ? 'ico_trash' : 'ico_add_customer';
  return (
    <Wrapper onClick={() => props.action()}>
      <FloatingActionButton iconWrapper={IconWrapper}>
        <Icon file={icon} />
      </FloatingActionButton>
    </Wrapper>
  );
};

export default OrderAddButton;
