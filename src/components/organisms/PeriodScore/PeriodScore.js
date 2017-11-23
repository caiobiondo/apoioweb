import React from 'react';
import { Loading } from 'natura-ui';
import {
  PeriodScoreQuery,
  PeriodScoreQueryOptions,
  ScoreCyclesQuery,
  ScoreCyclesQueryOptions,
} from './PeriodScore.data';
import { graphql, compose } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import withUserData from 'hocs/withUserData/withUserData';

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

const cycleSelected = cycleNumber => {
  console.log('cycle selected', cycleNumber);
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

const renderCycles = props => {
  const { growthStatus, scoreCycles } = props;

  return (
    <Wrapper>
      <SmallTitle>
        <FormattedMessage id="scoreStatementInPeriod" />
      </SmallTitle>

      <PointsCycleSelection
        onCycleClick={cycleSelected}
        startCycle={growthStatus.periodStartCycle}
        endCycle={growthStatus.periodEndCycle}
        currentCycle={growthStatus.cycle}
      />
    </Wrapper>
  );
};

const renderScore = props => {
  const { growthStatus } = props;

  const currentLevel = GrowthStatus.getCurrentLevel(growthStatus);
  const lastLevel = GrowthStatus.getLastLevel(growthStatus, currentLevel);
  const nextLevel = GrowthStatus.getNextLevel(growthStatus, currentLevel);

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const PeriodScore = props => {
  const { loadingScore, loadingCycles } = props;

  if (loadingScore || loadingCycles) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <PageTitle>
        <FormattedMessage id="checkYourScore" />
      </PageTitle>

      <Explanation>
        <FormattedMessage id="scoreExplanation" />
      </Explanation>

      <ContentWrapper>
        {renderScore(props)}
        {renderCycles(props)}
      </ContentWrapper>
    </Wrapper>
  );
};

export const PeriodScoreWithIntl = injectIntl(PeriodScore);

const PeriodScoreWithData = compose(
  graphql(PeriodScoreQuery, PeriodScoreQueryOptions),
  graphql(ScoreCyclesQuery, ScoreCyclesQueryOptions),
)(PeriodScoreWithIntl);

export default withUserData(PeriodScoreWithData);
