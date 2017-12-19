import React from 'react';
import { shallow } from 'enzyme';
import { MyScore } from './MyScore';
import { Loading } from 'natura-ui';

const setup = propOverrides => {
  const props = Object.assign(
    {
      growthStatus: {
        currentPlan: {
          levels: [{ levelId: 1, levelSequence: 1 }, { levelId: 2, levelSequence: 2 }],
        },
        currentLevelId: 2,
      },
    },
    propOverrides,
  );

  const result = shallow(<MyScore {...props} />);

  return {
    props,
    result,
  };
};

describe('MyScore', () => {
  it('renders my score', () => {
    // given

    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  describe('when is not last level', () => {
    it('renders my score', () => {
      // given
      const props = {
        growthStatus: {
          currentPlan: {
            levels: [
              { levelId: 1, levelSequence: 1 },
              { levelId: 2, levelSequence: 2 },
              { levelId: 3, levelSequence: 3 },
            ],
          },
          currentLevelId: 2,
        },
      };

      // when
      const { result } = setup(props);

      // then
      expect(result).toMatchSnapshot();
    });
  });

  it('renders loading screen', () => {
    // given
    const props = {
      loadingScore: true,
    };

    // when
    const { result } = setup(props);

    // then
    expect(result.find(Loading)).toHaveLength(1);
  });

  describe('cycleSelected', () => {
    it('sets component state', () => {
      // given
      const cycle = {
        number: 1,
      };

      // when
      const { result } = setup();
      result.instance().cycleSelected(cycle);

      // then
      expect(result.state('selectedCycleNumber')).toEqual(cycle);
    });
  });

  describe('resetCycleSelection', () => {
    it('sets component state', () => {
      // given
      const cycle = {
        number: 1,
      };

      // when
      const { result } = setup();
      result.instance().cycleSelected(cycle);
      result.instance().resetCycleSelection();

      // then
      expect(result.state('selectedCycleNumber')).toBeNull();
    });
  });

  describe('changeSelectedPeriod', () => {
    it('sets component state', () => {
      // given

      // when
      const { result } = setup();
      result.instance().changeSelectedPeriod('first period');

      // then
      expect(result.state('selectedPeriod')).toBe('first period');
    });

    it('resets cycle selection', () => {
      // given
      const resetCycleSelection = jest.fn();

      // when
      const { result } = setup();
      result.instance().resetCycleSelection = resetCycleSelection;
      result.instance().changeSelectedPeriod('first period');

      // then
      expect(resetCycleSelection).toBeCalled();
    });
  });
});
