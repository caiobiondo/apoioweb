import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import CourseStartView from './index';

const baseState = {
  empty: false,
  loading: true,
};

const props = {
  match: {
    params: { id: 1 },
  },
  user: {
    codigo: 1234,
  },
};

describe('CourseStartView Ecosystem', () => {
  it('should render the training course page', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<CourseStartView {...props} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should update empty and loading state', () => {
    const expectedState = { ...baseState, empty: true, loading: false };

    const result = shallow(<CourseStartView {...props} />);
    const instance = result.instance();
    instance.onLoadFinished(true, false);

    expect(instance.state).toEqual(expectedState);
  });
});
