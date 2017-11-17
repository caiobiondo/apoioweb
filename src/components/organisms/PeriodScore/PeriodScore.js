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
  ContentWrapper,
  DottedSeparator,
  Explanation,
  PageTitle,
  ScoreProgressWrapper,
  ScoreStatementWrapper,
  ScoreToNextLevelWrapper,
  ScoreToNextLevel,
  SmallTitle,
  Wrapper,
} from './PeriodScore.styles';

import ScoreStatement from 'components/molecules/ScoreStatement/ScoreStatement';
import ScoreProgress from 'components/molecules/ScoreProgress/ScoreProgress';
import PointsCycleSelection from 'components/molecules/PointsCycleSelection/PointsCycleSelection';

import GrowthStatus from './GrowthStatus';

const cycleSelected = () => {
  console.log('cycle selected');
};

const isOnLastLevel = (currentLevel, nextLevel) => {
  return !nextLevel || !nextLevel.id || currentLevel.id === nextLevel.id;
};

const renderScoreToNextLevelMessage = (growthStatus, currentLevel, nextLevel) => {
  if (isOnLastLevel(currentLevel, nextLevel)) {
    return null;
  }

  const pointsToNextLevel = GrowthStatus.getPointsToNextLevel(growthStatus, currentLevel);

  return (
    <ScoreToNextLevelWrapper>
      <ScoreToNextLevel>
        <FormattedMessage
          id="pointsToNextLevel"
          values={{ points: <b>{pointsToNextLevel}</b>, nextLevelName: nextLevel.text }}
        />
      </ScoreToNextLevel>
    </ScoreToNextLevelWrapper>
  );
};

const PeriodScore = props => {
  console.log(props);
  const { loading, growthStatus } = props;

  if (loading && !growthStatus) {
    return <Loading />;
  }

  const currentLevel = GrowthStatus.getCurrentLevel(growthStatus);
  const lastLevel = GrowthStatus.getLastLevel(growthStatus, currentLevel);
  const nextLevel = GrowthStatus.getNextLevel(growthStatus, currentLevel);

  return (
    <Wrapper>
      <PageTitle>
        <FormattedMessage id="checkYourScore" />
      </PageTitle>

      <Explanation>
        <FormattedMessage id="scoreExplanation" />
      </Explanation>

      <ContentWrapper>
        <BigTitle>
          <FormattedMessage id="totalScoreInPeriod" />
        </BigTitle>

        <ScoreProgressWrapper>
          <ScoreProgress
            currentPoints={props.growthStatus.periodTotalPoints}
            currentLevel={currentLevel}
            nextLevel={nextLevel}
            lastLevel={lastLevel}
            isOnLastLevel={isOnLastLevel(currentLevel, nextLevel)}
          />
        </ScoreProgressWrapper>

        {renderScoreToNextLevelMessage(growthStatus, currentLevel, nextLevel)}

        <BarSeparator color={currentLevel.color} />

        <SmallTitle>
          <FormattedMessage id="yourScoreDemonstration" />
        </SmallTitle>

        <ScoreStatementWrapper>
          <ScoreStatement growthStatus={growthStatus} cardsColor={currentLevel.color} />
        </ScoreStatementWrapper>

        <DottedSeparator color={currentLevel.color} />

        <SmallTitle>
          <FormattedMessage id="scoreStatementInPeriod" />
        </SmallTitle>

        <PointsCycleSelection
          onCycleClick={cycleSelected}
          startCycle={growthStatus.periodStartCycle}
          endCycle={growthStatus.periodEndCycle}
          currentCycle={growthStatus.cycle}
        />
      </ContentWrapper>
    </Wrapper>
  );
};

export const PeriodScoreWithIntl = injectIntl(PeriodScore);

export default graphql(PeriodScoreQuery, PeriodScoreQueryOptions)(PeriodScoreWithIntl);
