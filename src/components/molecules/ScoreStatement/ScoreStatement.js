import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { CardWithTitle, Icon } from 'natura-ui';
import {
  Wrapper,
  MergedIconWrapper,
  SignSeparator,
  Block,
  IconWrapper,
} from './ScoreStatement.styles';

const cardContentStyle = {
  fontFamily: 'Roboto-Regular',
};

const cardStyle = {
  height: '117px',
  width: '117px',
};

const cardTitleStyle = {
  textAlign: 'left',
};

const getCardText = points => `${points} pts`;

const translate = label => <FormattedMessage id={label} />;
const buildIcon = (iconName, color, extraStyles = {}) => {
  return (
    <IconWrapper color={color} style={extraStyles}>
      <Icon file={iconName} />
    </IconWrapper>
  );
};

const buildTotalsIcon = color => {
  const rightIconStyles = {
    width: '7px',
    borderRight: `0.5px solid ${color}`,
    marginRight: '1px',
  };

  const leftIconStyles = {
    width: '7px',
    borderRight: `0.5px solid ${color}`,
    transform: 'scaleX(-1)',
  };

  return (
    <MergedIconWrapper>
      {buildIcon('ico_monitor', color, rightIconStyles)}
      {buildIcon('ico_marker', color, leftIconStyles)}
    </MergedIconWrapper>
  );
};

const ScoreStatement = props => {
  const { growthStatus, cardsColor } = props;

  return (
    <Wrapper>
      <Block>
        <CardWithTitle
          cardStyle={cardStyle}
          contentStyle={cardContentStyle}
          title={translate('naturaNetworkPointsTitle')}
          titleColor={cardsColor}
          titleStyle={cardTitleStyle}
          icon={buildIcon('ico_monitor', cardsColor)}
        >
          {getCardText(growthStatus.periodNaturaNetwork)}
        </CardWithTitle>
      </Block>

      <Block>
        <SignSeparator>+</SignSeparator>
      </Block>

      <Block>
        <CardWithTitle
          cardStyle={cardStyle}
          contentStyle={cardContentStyle}
          title={translate('directSalesPointsTitle')}
          titleColor={cardsColor}
          titleStyle={cardTitleStyle}
          icon={buildIcon('ico_marker', cardsColor)}
        >
          {getCardText(growthStatus.periodDirectSales)}
        </CardWithTitle>
      </Block>

      <Block>
        <SignSeparator>=</SignSeparator>
      </Block>

      <Block>
        <CardWithTitle
          cardStyle={cardStyle}
          contentStyle={cardContentStyle}
          title={translate('totalPointsTitle')}
          titleColor={cardsColor}
          titleStyle={cardTitleStyle}
          icon={buildTotalsIcon(cardsColor)}
        >
          {getCardText(growthStatus.periodTotalPoints)}
        </CardWithTitle>
      </Block>
    </Wrapper>
  );
};

ScoreStatement.propTypes = {
  growthStatus: PropTypes.object,
};

ScoreStatement.defaultProps = {
  growthStatus: {},
};

export default injectIntl(ScoreStatement);
