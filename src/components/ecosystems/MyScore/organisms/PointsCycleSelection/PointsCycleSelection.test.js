import React from 'react';
import { shallow } from 'enzyme';
import PointsCycleSelection from './PointsCycleSelection';
import { CycleButton } from './PointsCycleSelection.styles';

const setup = propOverrides => {
  const props = Object.assign(
    {
      startCycle: 1,
      endCycle: 10,
      selectedPeriod: 'current',
      selectedCycleNumber: 2,
      currentCycleNumber: 1,
      scoreCycles: [
        /* eslint-disable camelcase */
        { nm_cycle: 1, vl_score: 1012, vl_value: 3587 },
        { nm_cycle: 2, vl_score: 0, vl_value: 0 },
        { nm_cycle: 3, vl_score: 1028, vl_value: 4294 },
        /* eslint-enable camelcase */
      ],
      currentLevelColor: '128, 128, 128',
      onCycleClick: jest.fn(),
    },
    propOverrides,
  );

  const result = shallow(<PointsCycleSelection {...props} />);

  return {
    props,
    result,
  };
};

describe('PointsCycleSelection', () => {
  it('renders points cycle selection', () => {
    // given

    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  describe('CycleButton', () => {
    it('show orders from current cycle', () => {
      // given
      const onCycleClick = jest.fn();

      // when
      const { result } = setup({ onCycleClick });
      result
        .find(CycleButton)
        .first()
        .simulate('click');

      // then
      expect(onCycleClick).toBeCalledWith(1);
    });

    it('show orders from selected cycle', () => {
      // given
      const onCycleClick = jest.fn();
      const currentCycleNumber = 2;

      // when
      const { result } = setup({ onCycleClick, currentCycleNumber });
      result
        .find(CycleButton)
        .first()
        .simulate('click');

      // then
      expect(onCycleClick).toBeCalledWith(1);
    });
  });
});
