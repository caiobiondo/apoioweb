import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';

import { EmptyContainer, IconWrapper, Title } from './EmptyCustomers.styles';

const EmptyCustomers = () => {
  return (
    <EmptyContainer>
      <IconWrapper>
        <Icon file="ico_box" />
      </IconWrapper>
      <Title>
        <FormattedMessage id="customersEmptyList" />
      </Title>
    </EmptyContainer>
  );
};

EmptyCustomers.defaultProps = {};

EmptyCustomers.propTypes = {};

export default EmptyCustomers;
