import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { CardWithTitle } from 'natura-ui';
import { Wrapper, SignSeparator, Block } from './ScoreStatement.styles';

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

const ScoreStatement = props => {
  const { growthStatus } = props;

  return (
    <Wrapper>
      <Block>
        <CardWithTitle
          cardStyle={cardStyle}
          contentStyle={cardContentStyle}
          title={translate('naturaNetworkPointsTitle')}
          titleColor={'#c47f5b'}
          titleStyle={cardTitleStyle}
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
          titleColor={'#c47f5b'}
          titleStyle={cardTitleStyle}
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
          titleColor={'#c47f5b'}
          titleStyle={cardTitleStyle}
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
