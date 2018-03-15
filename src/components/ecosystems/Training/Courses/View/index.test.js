import React from 'react';
import { shallow } from 'enzyme';
import CourseView from './index';

const baseState = {
  empty: false,
  loading: true,
};

const props = {
  match: {
    params: { id: 1 },
  },
};

describe('CourseView Ecosystem', () => {
  it('should render the training course page', () => {
    const result = shallow(<CourseView {...props} />);

    expect(result).toMatchSnapshot();
  });

  it('should update empty and loading state', () => {
    const expectedState = { ...baseState, empty: true, loading: false };

    const result = shallow(<CourseView {...props} />);
    const instance = result.instance();
    instance.onLoadFinished(true, false);

    expect(instance.state).toEqual(expectedState);
  });
});
