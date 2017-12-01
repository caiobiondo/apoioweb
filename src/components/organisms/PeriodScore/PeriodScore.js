import React, { Component } from 'react';
import { Loading } from 'natura-ui';
import { PeriodScoreQuery, PeriodScoreQueryOptions } from './PeriodScore.data';
import { graphql } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import withUserData from 'hocs/withUserData/withUserData';
import LevelList from 'components/atoms/LevelList';

import {
  BarSeparator,
  BigTitle,
  ContentWrapper,
  DottedSeparator,
  Explanation,
  PageTitle,
  ScoreProgressWrapper,
  ScoreStatementWrapper,
  SmallTitle,
  Wrapper,
  LevelListWrapper,
} from './PeriodScore.styles';

import ScoreStatement from 'components/molecules/ScoreStatement/ScoreStatement';
import ScoreProgress from 'components/molecules/ScoreProgress/ScoreProgress';
import ScoreToNextLevel from 'components/atoms/ScoreToNextLevel';

import GrowthStatus from './GrowthStatus';
import ScoreCycles from './ScoreCycles';

class PeriodScore extends Component {
  constructor(props) {
    super(props);
    this.renderScore = this.renderScore.bind(this);
    this.renderCycles = this.renderCycles.bind(this);
    this.renderScoreToNextLevelMessage = this.renderScoreToNextLevelMessage.bind(this);
    this.isOnLastLevel = this.isOnLastLevel.bind(this);
    this.cycleSelected = this.cycleSelected.bind(this);
    this.resetCycleSelection = this.resetCycleSelection.bind(this);
    this.changeSelectedPeriod = this.changeSelectedPeriod.bind(this);

    this.state = {
      selectedPeriod: 'current',
    };
  }

  changeSelectedPeriod(period) {
    this.setState({ selectedPeriod: period });
    this.resetCycleSelection();
  }

  cycleSelected(cycle) {
    this.setState({ selectedCycleNumber: cycle.number });
  }

  resetCycleSelection() {
    this.setState({ selectedCycleNumber: null });
  }

  isOnLastLevel(currentLevel, nextLevel) {
    return !nextLevel || !nextLevel.id || currentLevel.id === nextLevel.id;
  }

  renderScoreToNextLevelMessage(growthStatus, currentLevel, nextLevel) {
    if (this.isOnLastLevel(currentLevel, nextLevel)) {
      return null;
    }

    const pointsToNextLevel = GrowthStatus.getPointsToNextLevel(growthStatus, currentLevel);

    return <ScoreToNextLevel points={pointsToNextLevel} nextLevelName={nextLevel.text} />;
  }

  renderCycles(currentLevel) {
    return (
      <ScoreCycles
        key={this.state.selectedPeriod}
        growthStatus={this.props.growthStatus}
        currentLevel={currentLevel}
        selectedCycleNumber={this.state.selectedCycleNumber}
        cycleSelected={this.cycleSelected}
        changeSelectedPeriod={this.changeSelectedPeriod}
        selectedPeriod={this.state.selectedPeriod}
      />
    );
  }

  renderScore(currentLevel) {
    const { growthStatus } = this.props;

    const previousLevel = GrowthStatus.getPreviousLevel(growthStatus, currentLevel);
    const nextLevel = GrowthStatus.getNextLevel(growthStatus, currentLevel);
    const allLevels = GrowthStatus.parseAllLevels(growthStatus);
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
            previousLevel={previousLevel}
            isOnLastLevel={this.isOnLastLevel(currentLevel, nextLevel)}
          />
          <LevelListWrapper>
            <LevelList levels={allLevels} />
          </LevelListWrapper>
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
    const { loadingScore, growthStatus } = this.props;

    if (loadingScore) {
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
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export const PeriodScoreWithIntl = injectIntl(PeriodScore);

export const PeriodScoreWithPeriodScoreData = graphql(PeriodScoreQuery, PeriodScoreQueryOptions)(
  PeriodScoreWithIntl,
);

export default withUserData(PeriodScoreWithPeriodScoreData);
