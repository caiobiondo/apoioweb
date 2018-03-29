import gql from 'graphql-tag';

export const ScoreCyclesQuery = gql`
  query ScoreCyclesQuery($consultantId: Int!, $cycleStart: Int!, $cycleEnd: Int!, $cycle: Int!) {
    scoreCycles(
      consultantId: $consultantId
      cycleStart: $cycleStart
      cycleEnd: $cycleEnd
      cycle: $cycle
    ) {
      totalScore {
        nm_cycle
        vl_score
      }
    }
  }
`;

export const ScoreCyclesQueryOptions = {
  options(props) {
    let cycle = props.growthStatus.cycle;
    let cycleStart = props.growthStatus.periodStartCycle;
    let cycleEnd = props.growthStatus.periodEndCycle;

    if (props.selectedPeriod === 'last') {
      cycle = props.previousPeriod.start;
      cycleStart = 11;
      cycleEnd = 18;
    }

    return {
      forceFetch: true,
      variables: {
        consultantId: props.user.codigo,
        cycleStart,
        cycleEnd,
        cycle,
      },
    };
  },
  props({ data: { loading, scoreCycles } }) {
    return {
      loadingCycles: loading,
      scoreCycles,
    };
  },
};

export const PreviousPeriodQuery = gql`
  query PreviousPeriodQuery($cycle: String!) {
    previousPeriod(cycle: $cycle) {
      start
      year
    }
  }
`;

export const PreviousPeriodQueryOptions = {
  options(props) {
    return {
      forceFetch: true,
      variables: {
        cycle: props.growthStatus.cycle,
      },
    };
  },
  props({ data: { loading, previousPeriod } }) {
    return {
      loadingPreviousPeriod: loading,
      previousPeriod,
    };
  },
};
