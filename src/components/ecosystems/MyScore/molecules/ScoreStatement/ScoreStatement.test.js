import React from 'react';
import { shallow } from 'enzyme';
import ScoreStatement from './ScoreStatement';
import 'jest-styled-components';

const setup = propOverrides => {
  const props = Object.assign(
    {
      growthStatus: {
        periodNaturaNetwork: 1,
        periodDirectSales: 2,
        periodTotalPoints: 3,
      },
    },
    propOverrides,
  );

  const result = shallow(<ScoreStatement {...props} />);

  return {
    props,
    result,
  };
};

describe('ScoreStatement', () => {
  it('renders a score statement', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });
});
