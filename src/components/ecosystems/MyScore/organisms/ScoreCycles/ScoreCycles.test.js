import React from 'react';
import { shallow } from 'enzyme';
import { ScoreCycles } from './ScoreCycles';
import PeriodHistory from '../PeriodHistory/PeriodHistory';

const setup = propOverrides => {
  const props = Object.assign(
    {
      loadingCycles: false,
      loadingPreviousPeriod: false,
      selectedCycleNumber: 2,
      previousPeriod: {
        year: '2016',
      },
      growthStatus: {
        currentPlan: {
          levels: [{ levelId: 1, levelSequence: 1 }, { levelId: 2, levelSequence: 2 }],
          growthPlanYear: '2017',
        },
        currentLevelId: 2,
        cycle: '201708',
        parsedCycle: '2017/08',
      },
      currentLevel: {
        color: '128, 128, 128',
        id: 2,
        // text: 'current level name',
        // points: 'levelPointsRangeEnd',
        // sequence: 'levelSequence',
      },
      scoreCycles: [
        /* eslint-disable camelcase */
        { nm_cycle: 1, vl_score: 1012, vl_value: 3587 },
        { nm_cycle: 2, vl_score: 0, vl_value: 0 },
        { nm_cycle: 3, vl_score: 1028, vl_value: 4294 },
        /* eslint-enable camelcase */
      ],
    },
    propOverrides,
  );

  const result = shallow(<ScoreCycles {...props} />);

  return {
    props,
    result,
  };
};

describe('ScoreCycles', () => {
  it('renders score cycles', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  describe('when there is no selected cycle', () => {
    it('does not render period history', () => {
      // given
      const props = {
        selectedCycleNumber: null,
      };

      // when
      const { result } = setup(props);

      // then
      expect(result.find(PeriodHistory).exists()).toBeFalsy();
    });
  });

  describe('when loading cycles', () => {
    it('does not render', () => {
      // given
      const props = {
        loadingCycles: true,
        loadingPreviousPeriod: false,
      };

      // when
      const { result } = setup(props);

      // then
      expect(result.exists()).toBeTruthy();
    });
  });

  describe('when loading previous period', () => {
    it('does not render', () => {
      // given
      const props = {
        loadingCycles: false,
        loadingPreviousPeriod: true,
      };

      // when
      const { result } = setup(props);

      // then
      expect(result.exists()).toBeTruthy();
    });
  });
});
