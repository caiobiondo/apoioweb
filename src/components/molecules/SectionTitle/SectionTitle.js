import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'natura-ui';
import { SectionTitleWrapper } from './SectionTitle.styles';
import { FormattedMessage } from 'react-intl';

const SectionTitle = props => {
  const { iconName, children, value } = props;

  return (
    <SectionTitleWrapper {...props}>
      {iconName && <Icon file={iconName} />}
      {value ? <FormattedMessage id={value} /> : children}
    </SectionTitleWrapper>
  );
};

SectionTitle.propTypes = {
  iconName: PropTypes.string,
  value: PropTypes.string,
};

export default SectionTitle;
