import React from 'react';
import { shallow } from 'enzyme';
import IndicatorChart from './IndicatorChart';

const setup = propOverrides => {
  const props = Object.assign(
    {
      cycles: [{ value: 1 }],
      pastCycles: [{ value: 1 }],
      value: item => item.value,
    },
    propOverrides,
  );

  const result = shallow(<IndicatorChart {...props} />);

  return {
    props,
    result,
  };
};

describe('IndicatorChart', () => {
  it('should set the initial state correctly', () => {
    // given
    const expectedState = {
      currentPeriod: [{ x: 1, y: 1 }],
      pastPeriod: [{ x: 1, y: 1 }],
    };
    const props = {
      cycles: [{ value: 1 }],
      pastCycles: [{ value: 1 }],
    };

    // when
    const { result } = setup(props);
    const instance = result.instance();

    // then
    expect(instance.state.cycles).toEqual(expectedState);
  });

  describe('on componentWillReceiveProps method', () => {
    it('should update the chart dimensions correctly', () => {
      // given
      const props = {
        pastCycles: [{ value: 1 }, { value: 2 }],
      };
      const updatedProps = {
        cycleNode: {
          offsetWidth: 120,
        },
      };
      const expectedChartNode = { offsetHeight: 120 };
      const expectedChartWidth = updatedProps.cycleNode.offsetWidth * (props.pastCycles.length - 1);

      // when
      const { result } = setup(props);
      const instance = result.instance();
      instance.chartNode = expectedChartNode;
      instance.componentWillReceiveProps(updatedProps);

      // then
      expect(instance.state.chartWidth).toEqual(expectedChartWidth);
      expect(instance.state.chartHeight).toEqual(expectedChartNode.offsetHeight);
    });
  });

  describe('on setChartNode method', () => {
    it('should set the given value as node', () => {
      // given
      const value = 'test';

      // when
      const { result } = setup({});
      const instance = result.instance();
      instance.setChartNode(value);

      // then
      expect(instance.chartNode).toEqual(value);
    });
  });
});
