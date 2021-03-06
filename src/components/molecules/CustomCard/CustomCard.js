import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'natura-ui';

import CustomCardSection from 'components/atoms/CustomCardSection/CustomCardSection';
import CustomCardText from 'components/atoms/CustomCardText/CustomCardText';
import { CARD_COLOR } from 'utils/colors';

import { Wrapper, Border, Content, cardStyle } from './CustomCard.styles';

const CustomCard = ({ color, children }) => (
  <Wrapper>
    <Paper style={cardStyle}>
      {color && <Border color={color} />}
      <Content>{children}</Content>
    </Paper>
  </Wrapper>
);

CustomCard.SUCCESS = CARD_COLOR.SUCCESS;
CustomCard.WARNING = CARD_COLOR.WARNING;
CustomCard.DANGER = CARD_COLOR.DANGER;
CustomCard.INFO = CARD_COLOR.INFO;
CustomCard.Section = CustomCardSection;
CustomCard.Text = CustomCardText;

CustomCard.defaultProps = {
  color: null,
};

CustomCard.propTypes = {
  color: PropTypes.string,
};

export default CustomCard;
