import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import TrainingCoursesList from './index';

const baseState = {
  empty: false,
  loading: true,
};

const props = {
  location: {
    search: '',
  },
};

describe('TrainingCoursesList Ecosystem', () => {
  it('should render the training courses list page', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TrainingCoursesList {...props} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should update empty and loading state', () => {
    const expectedState = { ...baseState, empty: true, loading: false, courseFilter: '' };

    const result = shallow(<TrainingCoursesList {...props} />);
    const instance = result.instance();
    instance.onLoadFinished(true, false);

    expect(instance.state).toEqual(expectedState);
  });
});
