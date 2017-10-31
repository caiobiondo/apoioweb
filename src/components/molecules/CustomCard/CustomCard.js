import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'natura-ui';

import CustomCardSection from './CustomCardSection';
import CustomCardText from './CustomCardText';
import { CARD_COLOR } from './utils';

import { Wrapper, Border, Content } from './CustomCard.styles';

const CustomCard = ({ color, children }) => (
  <Wrapper>
    <Card style={styles().card}>
      {color && <Border color={color} />}

      <Content>{children}</Content>
    </Card>
  </Wrapper>
);

const styles = () => ({
  card: {
    padding: 0,
    borderRadius: 3,
    overflow: 'hidden',
    boxShadow: '2px 4px 5px -2px rgba(0,0,0,0.1)',
    wordBreak: 'break-word'
  }
});

CustomCard.SUCCESS = CARD_COLOR.SUCCESS;
CustomCard.WARNING = CARD_COLOR.WARNING;
CustomCard.DANGER = CARD_COLOR.DANGER;
CustomCard.INFO = CARD_COLOR.INFO;
CustomCard.Section = CustomCardSection;
CustomCard.Text = CustomCardText;

CustomCard.defaultProps = {
  color: null
};

CustomCard.propTypes = {
  color: PropTypes.string
};

export default CustomCard;
