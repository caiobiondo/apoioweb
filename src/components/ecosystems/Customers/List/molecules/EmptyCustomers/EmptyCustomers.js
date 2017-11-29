import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';

import { Container, IconWrapper, Title, Description } from './EmptyCustomers.styles';

const EmptyCustomers = () => {
  return (
    <Container>
      <IconWrapper>
        <Icon file="ico_box" />
      </IconWrapper>
      <Title>
        <FormattedMessage id="customersEmptyList" />
      </Title>
    </Container>
  );
};

EmptyCustomers.defaultProps = {};

EmptyCustomers.propTypes = {};

export default EmptyCustomers;
