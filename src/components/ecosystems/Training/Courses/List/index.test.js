import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import TrainingCoursesList from './index';

const baseState = {
  empty: false,
  loading: true,
};

describe('TrainingCoursesList Ecosystem', () => {
  it('should render the training courses list page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<TrainingCoursesList />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should update empty and loading state', () => {
    const expectedState = { ...baseState, empty: true, loading: false };

    const result = shallow(<TrainingCoursesList />);
    const instance = result.instance();
    instance.onLoadFinished(true, false);

    expect(instance.state).toEqual(expectedState);
  });
});
