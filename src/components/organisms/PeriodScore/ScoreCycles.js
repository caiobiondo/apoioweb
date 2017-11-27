import React from 'react';
import { ScoreCyclesQuery, ScoreCyclesQueryOptions } from './PeriodScore.data';
import { graphql } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import withUserData from 'hocs/withUserData/withUserData';

import { SmallTitle, Wrapper } from './PeriodScore.styles';

import PointsCycleSelection from 'components/organisms/PointsCycleSelection/PointsCycleSelection';

const ScoreCycles = props => {
  const currentCycleNumber = parseInt(props.growthStatus.parsedCycle.split('/')[0], 10);

  if (props.loadingCycles) {
    return null;
  }

  return (
    <Wrapper>
      <SmallTitle>
        <FormattedMessage id="scoreStatementInPeriod" />
      </SmallTitle>

      <PointsCycleSelection
        onCycleClick={props.cycleSelected}
        startCycle={props.growthStatus.periodStartCycle}
        endCycle={props.growthStatus.periodEndCycle}
        currentCycleNumber={currentCycleNumber}
        currentLevelColor={props.currentLevel.color}
        scoreCycles={props.scoreCycles.totalScore}
        selectedCycleNumber={props.selectedCycleNumber}
      />
    </Wrapper>
  );
};

export const PeriodScoreWithIntl = injectIntl(ScoreCycles);

export const PeriodScoreWithScoreCycleData = graphql(ScoreCyclesQuery, ScoreCyclesQueryOptions)(
  PeriodScoreWithIntl,
);

export default withUserData(PeriodScoreWithScoreCycleData);
