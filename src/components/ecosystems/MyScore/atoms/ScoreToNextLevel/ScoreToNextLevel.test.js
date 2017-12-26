import React from 'react';
import { shallow } from 'enzyme';
import ScoreToNextLevel from './ScoreToNextLevel';

describe('ScoreToNextLevel', () => {
  it('should render correctly', () => {
    const result = shallow(<ScoreToNextLevel points={100} nextLevelName="Next Level" />);

    expect(result).toMatchSnapshot();
  });
});
