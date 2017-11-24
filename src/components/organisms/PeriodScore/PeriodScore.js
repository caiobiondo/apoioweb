import React, { Component } from 'react';
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
import PointsCycleSelection from 'components/organisms/PointsCycleSelection/PointsCycleSelection';

import GrowthStatus from './GrowthStatus';
import PeriodHistory from '../PeriodHistory/PeriodHistory';

class PeriodScore extends Component {
  constructor(props) {
    super(props);
    this.renderScore = this.renderScore.bind(this);
    this.renderCycles = this.renderCycles.bind(this);
    this.renderScoreToNextLevelMessage = this.renderScoreToNextLevelMessage.bind(this);
    this.isOnLastLevel = this.isOnLastLevel.bind(this);
    this.cycleSelected = this.cycleSelected.bind(this);
    this.renderPeriodHistory = this.renderPeriodHistory.bind(this);

    this.state = {};
  }

  cycleSelected(cycle) {
    this.setState({ selectedCycleNumber: cycle.number });
  }

  isOnLastLevel(currentLevel, nextLevel) {
    return !nextLevel || !nextLevel.id || currentLevel.id === nextLevel.id;
  }

  renderPeriodHistory() {
    if (!this.state.selectedCycleNumber) {
      return null;
    }

    return <PeriodHistory />;
  }

  renderScoreToNextLevelMessage(growthStatus, currentLevel, nextLevel) {
    if (this.isOnLastLevel(currentLevel, nextLevel)) {
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
  }

  renderCycles(currentLevel) {
    const { growthStatus, scoreCycles } = this.props;
    const currentCycleNumber = parseInt(growthStatus.cycle.split('/')[0], 10);

    return (
      <Wrapper>
        <SmallTitle>
          <FormattedMessage id="scoreStatementInPeriod" />
        </SmallTitle>

        <PointsCycleSelection
          onCycleClick={this.cycleSelected}
          startCycle={growthStatus.periodStartCycle}
          endCycle={growthStatus.periodEndCycle}
          currentCycleNumber={currentCycleNumber}
          currentLevelColor={currentLevel.color}
          scoreCycles={scoreCycles.totalScore}
          selectedCycleNumber={this.state.selectedCycleNumber}
        />
      </Wrapper>
    );
  }

  renderScore(currentLevel) {
    const { growthStatus } = this.props;

    const lastLevel = GrowthStatus.getLastLevel(growthStatus, currentLevel);
    const nextLevel = GrowthStatus.getNextLevel(growthStatus, currentLevel);

    return (
      <Wrapper>
        <BigTitle>
          <FormattedMessage id="totalScoreInPeriod" />
        </BigTitle>

        <ScoreProgressWrapper>
          <ScoreProgress
            currentPoints={this.props.growthStatus.periodTotalPoints}
            currentLevel={currentLevel}
            nextLevel={nextLevel}
            lastLevel={lastLevel}
            isOnLastLevel={this.isOnLastLevel(currentLevel, nextLevel)}
          />
        </ScoreProgressWrapper>

        {this.renderScoreToNextLevelMessage(growthStatus, currentLevel, nextLevel)}

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
  }

  render() {
    const { loadingScore, loadingCycles, growthStatus } = this.props;

    if (loadingScore || loadingCycles) {
      return <Loading />;
    }

    const currentLevel = GrowthStatus.getCurrentLevel(growthStatus);

    return (
      <Wrapper>
        <PageTitle>
          <FormattedMessage id="checkYourScore" />
        </PageTitle>

        <Explanation>
          <FormattedMessage id="scoreExplanation" />
        </Explanation>

        <ContentWrapper>
          {this.renderScore(currentLevel)}
          {this.renderCycles(currentLevel)}
          {this.renderPeriodHistory()}
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export const PeriodScoreWithIntl = injectIntl(PeriodScore);

const PeriodScoreWithData = compose(
  graphql(PeriodScoreQuery, PeriodScoreQueryOptions),
  graphql(ScoreCyclesQuery, ScoreCyclesQueryOptions),
)(PeriodScoreWithIntl);

export default withUserData(PeriodScoreWithData);
