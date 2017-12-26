import React from 'react';
import { shallow } from 'enzyme';
import LevelList from './LevelList';

describe('LevelList', () => {
  it('should render correctly', () => {
    const levels = [
      {
        color: '#ffcc00',
        text: 'Level 1',
        pointsText: 'from 200 pts',
      },
      {
        color: '#ff0057',
        text: 'Level 2',
        pointsText: '200 pts - 1000 pts',
      },
      {
        color: '#045b04',
        text: 'Start',
        pointsText: 'after 1000 pts',
      },
    ];

    const result = shallow(<LevelList levels={levels} />);

    expect(result).toMatchSnapshot();
  });
});
