import React from 'react';
import { shallow } from 'enzyme';
import { MyScore } from './MyScore';
import { Loading } from 'natura-ui';

const setup = propOverrides => {
  const props = Object.assign(
    {
      growthStatus: {
        currentPlan: {
          levels: [{ levelId: 1 }, { levelId: 2 }],
        },
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
});
