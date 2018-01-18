import React from 'react';
import { FloatingActionButton, Icon } from 'natura-ui';
import { IconWrapper } from './OrderAddButton.styles';

const OrderAddButton = ({ onClick }) => (
  <FloatingActionButton onClick={onClick} iconWrapper={IconWrapper}>
    <Icon file="ico_add_box" />
  </FloatingActionButton>
);

export default OrderAddButton;
