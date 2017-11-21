import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'natura-ui';
import { SectionTitleWrapper } from './SectionTitle.styles';

const SectionTitle = props => {
  const { iconName, children } = props;

  return (
    <SectionTitleWrapper {...props}>
      <Icon file={iconName} />
      {children}
    </SectionTitleWrapper>
  );
};

SectionTitle.propTypes = {
  iconName: PropTypes.string,
};

export default SectionTitle;
