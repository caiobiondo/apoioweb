import gql from 'graphql-tag';
import { IndicatorTypes } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';

export const IndicatorListQuery = gql`
  query CareerPlanQuery(
    $sellerId: Int!
    $pastYearLastCycle: Int!
    $closedCycle: Int!
    $currentYear: Int!
    $pastYear: Int!
    $indicatorTypes: [Int]
    $businessModel: Int!
    $country: Int!
  ) {
    currentIndicators: indicators(
      sellerId: $sellerId
      year: $currentYear
      cycle: $closedCycle
      indicatorTypes: $indicatorTypes
      businessModel: $businessModel
      country: $country
    ) {
      indicatorType
      significance
      cycles {
        cycle
        isClosed
        objective
        directSale
        naturaNetwork
        overcoming {
          cycle
          value
          concept
        }
      }
    }
    pastIndicators: indicators(
      sellerId: $sellerId
      year: $pastYear
      cycle: $pastYearLastCycle
      indicatorTypes: $indicatorTypes
      businessModel: $businessModel
      country: $country
    ) {
      indicatorType
      significance
      cycles {
        cycle
        isClosed
        objective
        directSale
        naturaNetwork
        overcoming {
          cycle
          value
          concept
        }
      }
    }
    concepts(
      sellerId: $sellerId
      cycle: $closedCycle
      businessModel: $businessModel
      country: $country
    ) {
      rangeStart
      rangeEnd
      value
    }
  }
`;

export const OvercomingQuery = gql`
  query OvercomingQuery(
    $sellerId: Int!
    $cycleArray: [Int]!
    $indicatorType: Int!
    $directSale: [Float]!
    $naturaNetwork: [Float]!
    $businessModel: Int!
    $country: Int!
  ) {
    cyclesOvercoming(
      sellerId: $sellerId
      cycleArray: $cycleArray
      indicatorType: $indicatorType
      directSale: $directSale
      naturaNetwork: $naturaNetwork
      businessModel: $businessModel
      country: $country
    ) {
      cycle
      value
      concept
    }
  }
`;

export const CyclesConsolidatedQuery = gql`
  query CyclesConsolidatedQuery(
    $sellerId: Int!
    $year: Int!
    $indicators: [IndicatorInput]!
    $businessModel: Int!
    $country: Int!
  ) {
    cyclesConsolidated(
      sellerId: $sellerId
      year: $year
      indicators: $indicators
      businessModel: $businessModel
      country: $country
    ) {
      cycle
      value
      concept
    }
  }
`;

export const IndicatorListQueryOptions = {
  options({ user, currentCycle, currentYear, pastYear, businessModel, country }) {
    // workaround: setting a closedCycle until end of 2018
    const closedCycle = parseInt(currentCycle, 10) - 1;
    const pastYearLastCycle = 201718;

    return {
      variables: {
        indicatorTypes: Object.values(IndicatorTypes),
        sellerId: user.codigo,
        pastYearLastCycle,
        closedCycle,
        currentYear,
        pastYear,
        businessModel,
        country,
      },
      forceFetch: true,
    };
  },
  props({ data }) {
    return {
      data,
      loading: data.loading,
      indicators: getIndicators(data.currentIndicators, data.variables.indicatorTypes),
      pastIndicators: getIndicators(data.pastIndicators, data.variables.indicatorTypes),
      concepts: data.concepts,
      consolidatedCycles: getConsolidatedCycles(data.currentIndicators),
      pastConsolidatedCycles: getConsolidatedCycles(data.pastIndicators),
    };
  },
};

const getIndicators = (indicators, types) => {
  if (!indicators) {
    return null;
  }

  const filteredIndicators = indicators.filter(
    ({ indicatorType }) => types.indexOf(indicatorType) > -1,
  );
  const sortedIndicators = [
    filteredIndicators.find(({ indicatorType }) => indicatorType === IndicatorTypes.ScoresTotal),
    filteredIndicators.find(({ indicatorType }) => indicatorType === IndicatorTypes.Registration),
    filteredIndicators.find(({ indicatorType }) => indicatorType === IndicatorTypes.Active),
  ].filter(indicator => indicator);

  return sortedIndicators;
};

const getConsolidatedCycles = indicators => {
  if (!indicators || !indicators.length) {
    return [];
  }

  return indicators.filter(({ indicatorType }) => !indicatorType)[0].cycles;
};
