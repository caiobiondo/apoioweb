import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'natura-ui';

import { Container, IconWrapper, Title, Description } from './EmptyList.styles';

const EmptyList = ({ icon, titleId, descriptionId }) => {
  return (
    <Container>
      <IconWrapper>
        <Icon file={icon} />
      </IconWrapper>
      <Title>{titleId && <FormattedMessage id={titleId} />}</Title>
      <Description>{descriptionId && <FormattedMessage id={descriptionId} />}</Description>
    </Container>
  );
};

EmptyList.defaultProps = {
  icon: 'ico_box',
};

EmptyList.propTypes = {
  icon: PropTypes.string.isRequired,
  titleId: PropTypes.string,
  descriptionId: PropTypes.string,
};

export default EmptyList;
