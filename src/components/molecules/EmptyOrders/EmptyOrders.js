import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';

import { Container, IconWrapper, Title, Description } from './EmptyOrders.styles';

const EmptyOrders = () => {
  return (
    <Container>
      <IconWrapper>
        <Icon file="ico_box" />
      </IconWrapper>
      <Title>
        <FormattedMessage id="ordersEmptyList" />
      </Title>
      <Description>
        <FormattedMessage id="ordersWithoutOrders" />
      </Description>
    </Container>
  );
};

EmptyOrders.defaultProps = {};

EmptyOrders.propTypes = {};

export default EmptyOrders;
