import React from 'react';
import { shallow, render } from 'enzyme';
import TrainingMyList from './index';

const baseState = {
  empty: false,
  loading: true,
};

describe('TrainingMyList Ecosystem', () => {
  it('should render the training courses list page', () => {
    const props = {
      user: { codigo: 1 },
    };

    const result = shallow(<TrainingMyList {...props} />);

    expect(result).toMatchSnapshot();
  });

  it('should update empty and loading state', () => {
    const expectedState = { ...baseState, empty: true, loading: false };
    const props = {
      user: { codigo: 1 },
    };

    const result = shallow(<TrainingMyList {...props} />);
    const instance = result.instance();
    instance.onLoadFinished(true, false);

    expect(instance.state).toEqual(expectedState);
  });
});
