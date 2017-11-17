import React from 'react';
import { Loading } from 'natura-ui';
import { PeriodScoreQuery, PeriodScoreQueryOptions } from './PeriodScore.data';
import { graphql } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
// import { formatDate, formatCurrency } from 'locale/utils';
// import InfiniteScroll from 'react-infinite-scroller';
import {
  BarSeparator,
  BigTitle,
  DottedSeparator,
  Explanation,
  PageTitle,
  ScoreToNextLevelWrapper,
  ScoreWrapper,
  SmallTitle,
  Switcher,
  Wrapper,
} from './PeriodScore.styles';

import Progress from './Progress/Progress';
import ScoreStatement from './ScoreStatement/ScoreStatement';

const getCurrentLevel = growthStatus => {
  if (!growthStatus) {
    return {};
  }
  const { currentLevelId } = growthStatus;

  return growthStatus.currentPlan.levels.find(level => {
    return level.levelId === currentLevelId;
  });
};

const PeriodScore = props => {
  console.log(props);
  const { loading, growthStatus } = props;

  if (loading && !growthStatus) {
    return <Loading />;
  }

  const currentLevel = getCurrentLevel(growthStatus);

  return (
    <Wrapper>
      <PageTitle>
        <FormattedMessage id="checkYourScore" />
      </PageTitle>

      <Explanation>
        <FormattedMessage id="scoreExplanation" />
      </Explanation>

      <BigTitle>
        <FormattedMessage id="totalScoreInPeriod" />
      </BigTitle>

      <Progress growthStatus={props.growthStatus} currentLevel={currentLevel} />

      <ScoreToNextLevelWrapper />
      <BarSeparator />
      <SmallTitle>
        <FormattedMessage id="yourScoreDemonstration" />
      </SmallTitle>

      <ScoreStatement growthStatus={props.growthStatus} currentLevel={currentLevel} />
      <DottedSeparator color={currentLevel.color} />

      <SmallTitle>
        <FormattedMessage id="scoreStatementInPeriod" />
      </SmallTitle>

      <Switcher />
    </Wrapper>
  );
};

export const PeriodScoreWithIntl = injectIntl(PeriodScore);

export default graphql(PeriodScoreQuery, PeriodScoreQueryOptions)(PeriodScoreWithIntl);
