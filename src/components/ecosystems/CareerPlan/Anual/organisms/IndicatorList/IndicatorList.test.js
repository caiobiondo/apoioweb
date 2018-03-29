import React from 'react';
import { shallow } from 'enzyme';
import { IndicatorList } from './IndicatorList';

const setup = propOverrides => {
  const props = Object.assign(
    {
      concepts: [],
    },
    propOverrides,
  );

  const result = shallow(<IndicatorList {...props} />);

  return {
    props,
    result,
  };
};

describe('IndicatorList', () => {
  describe('on getPastIndicator method', () => {
    it('should get the past indicator, given an indicator type', () => {
      // given
      const props = {
        indicators: [
          {
            indicatorType: 'scoresTotal',
            cycles: [],
          },
        ],
        pastIndicators: [
          {
            indicatorType: 'scoresTotal',
            cycles: [],
          },
        ],
      };

      // when
      const { result } = setup(props);
      const instance = result.instance();
      const pastIndicator = instance.getPastIndicator('scoresTotal');

      // then
      expect(pastIndicator).toEqual(props.pastIndicators[0]);
    });
  });
});
