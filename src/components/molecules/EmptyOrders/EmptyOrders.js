import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Container } from './EmptyOrders.styles';

const EmptyOrders = () => (
  <Container>
    <span>Imagem</span>
    <FormattedMessage id="ordersEmptyList" />
    <FormattedMessage id="ordersWithoutOrders" />
  </Container>
);

EmptyOrders.defaultProps = {};

EmptyOrders.propTypes = {};

export default EmptyOrders;
