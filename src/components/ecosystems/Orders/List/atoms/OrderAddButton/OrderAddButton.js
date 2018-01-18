import React from 'react';
import { FloatingActionButton, Icon } from 'natura-ui';
import { IconWrapper } from './OrderAddButton.styles';

const OrderAddButton = () => (
  <FloatingActionButton onClick={() => redirectToOrders()} iconWrapper={IconWrapper}>
    <Icon file="ico_add_box" />
  </FloatingActionButton>
);

const redirectToOrders = () => {
  window.open('https://pedidos.natura.net/captaweb/');
};

export default OrderAddButton;
