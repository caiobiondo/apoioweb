import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'natura-ui';
import IconButton from 'material-ui/IconButton';
import { FormattedMessage } from 'react-intl';

import {
  SectionTitleWrapper,
  Title,
  ExpandableIconWrapper,
  ExpandableIconButton,
  ExpandableIcon,
} from './SectionTitle.styles';

const SectionTitle = props => {
  const { iconName, children, value, expandable, expanded, onToggle } = props;

  return (
    <SectionTitleWrapper {...props}>
      {iconName && <Icon file={iconName} />}
      {value ? (
        <Title>
          <FormattedMessage id={value} />
        </Title>
      ) : (
        children
      )}
      {expandable && (
        <ExpandableIconWrapper>
          <IconButton onClick={onToggle} style={ExpandableIconButton} iconStyle={ExpandableIcon}>
            {expanded ? <Icon file="ico_arrow_down" /> : <Icon file="ico_arrow_right" />}
          </IconButton>
        </ExpandableIconWrapper>
      )}
    </SectionTitleWrapper>
  );
};

SectionTitle.propTypes = {
  iconName: PropTypes.string,
  value: PropTypes.string,
};

export default SectionTitle;
