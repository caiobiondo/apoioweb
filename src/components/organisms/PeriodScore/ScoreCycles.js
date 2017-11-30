import React from 'react';
import { ScoreCyclesQuery, ScoreCyclesQueryOptions } from './PeriodScore.data';
import { graphql } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import withUserData from 'hocs/withUserData/withUserData';

import { SmallTitle, Wrapper, PeriodTogglerWrapper } from './PeriodScore.styles';

import PointsCycleSelection from 'components/organisms/PointsCycleSelection/PointsCycleSelection';
import PeriodToggler from 'components/molecules/PeriodToggler';

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
      />
    </Wrapper>
  );
};

export const ScoreCyclesWithIntl = injectIntl(ScoreCycles);

export const ScoreCyclesData = graphql(ScoreCyclesQuery, ScoreCyclesQueryOptions)(
  ScoreCyclesWithIntl,
);

export default withUserData(ScoreCyclesData);
