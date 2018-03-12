import React from 'react';
import {
  ScoreCyclesQuery,
  ScoreCyclesQueryOptions,
  PreviousPeriodQuery,
  PreviousPeriodQueryOptions,
} from './ScoreCycles.data';
import { graphql, compose } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import PeriodHistory from '../PeriodHistory/PeriodHistory';

import { SmallTitle, PeriodTogglerWrapper } from '../MyScore/MyScore.styles';
import { Wrapper } from './ScoreCycles.styles';

import PointsCycleSelection from '../PointsCycleSelection';
import PeriodToggler from '../../molecules/PeriodToggler';

const renderPeriodHistory = props => {
  if (!props.selectedCycleNumber) {
    return null;
  }

  let periodHistoryYear = props.growthStatus.currentPlan.growthPlanYear;

  if (props.selectedPeriod !== 'current') {
    periodHistoryYear = props.previousPeriod.year;
  }

  return (
    <PeriodHistory
      onClose={() => props.cycleSelected(null)}
      year={periodHistoryYear}
      cycleNumber={props.selectedCycleNumber}
    />
  );
};

export const ScoreCycles = props => {
  const currentCycleNumber = parseInt(props.growthStatus.parsedCycle.split('/')[0], 10);

  if (props.loadingCycles || props.loadingPreviousPeriod) {
    return null;
  }

  return (
    <Wrapper>
      <SmallTitle>
        <FormattedMessage id="scoreStatementInPeriod" />
      </SmallTitle>

      <PeriodTogglerWrapper>
        <PeriodToggler
          activePeriod={props.selectedPeriod}
          changeSelectedPeriod={props.changeSelectedPeriod}
        />
      </PeriodTogglerWrapper>

      <PointsCycleSelection
        onCycleClick={props.cycleSelected}
        startCycle={props.growthStatus.periodStartCycle}
        endCycle={props.growthStatus.periodEndCycle}
        currentCycleNumber={currentCycleNumber}
        currentLevelColor={props.currentLevel.color}
        scoreCycles={props.scoreCycles.totalScore}
        selectedCycleNumber={props.selectedCycleNumber}
        selectedPeriod={props.selectedPeriod}
      />

      {renderPeriodHistory(props)}
    </Wrapper>
  );
};

export const ScoreCyclesWithIntl = injectIntl(ScoreCycles);

export default compose(
  graphql(PreviousPeriodQuery, PreviousPeriodQueryOptions),
  graphql(ScoreCyclesQuery, ScoreCyclesQueryOptions),
)(ScoreCyclesWithIntl);
