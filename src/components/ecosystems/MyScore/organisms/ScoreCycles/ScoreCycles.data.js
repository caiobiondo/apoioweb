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

    if (props.selectedPeriod === 'last') {
      cycle = props.previousPeriod.start;
    }

    return {
      forceFetch: true,
      variables: {
        consultantId: props.user.codigo,
        cycleStart: props.growthStatus.periodStartCycle,
        cycleEnd: props.growthStatus.periodEndCycle,
        cycle: cycle,
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
