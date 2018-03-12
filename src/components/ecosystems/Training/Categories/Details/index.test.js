import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import TrainingCategoriesDetails from './index';

const baseState = {
  empty: false,
  loading: true,
};

describe('TrainingCategoriesDetails Ecosystem', () => {
  it('should render the training courses list page', () => {
    const renderer = new ShallowRenderer();
    const params = { id: 1 };

    renderer.render(<TrainingCategoriesDetails match={{ params }} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should update empty and loading state', () => {
    const expectedState = { ...baseState, empty: true, loading: false };
    const params = { id: 1 };

    const result = shallow(<TrainingCategoriesDetails match={{ params }} />);
    const instance = result.instance();
    instance.onLoadFinished(true, false);

    expect(instance.state).toEqual(expectedState);
  });
});
