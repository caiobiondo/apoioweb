import React from 'react';
import { FloatingActionButton, Icon } from 'natura-ui';
import { IconWrapper } from './OrderAddButton.styles';

const OrderAddButton = () => (
  <FloatingActionButton iconWrapper={IconWrapper}>
    <Icon file="ico_add_box" />
  </FloatingActionButton>
);

export default OrderAddButton;
