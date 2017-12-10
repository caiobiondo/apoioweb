import React from 'react';
import { shallow } from 'enzyme';
import ScoreProgress from './ScoreProgress';
import 'jest-styled-components';

const setup = propOverrides => {
  const props = Object.assign(
    {
      currentLevel: {
        points: '1',
      },
      previousLevel: {
        points: '1',
      },
      nextLevel: {
        points: '1',
      },
      currentPoints: '1',
      isOnLastLevel: false,
    },
    propOverrides,
  );

  const result = shallow(<ScoreProgress {...props} />);

  return {
    props,
    result,
  };
};

describe('ScoreProgress', () => {
  it('renders a score progress', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });
});
