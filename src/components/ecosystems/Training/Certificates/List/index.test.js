import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import CertificateList from './index';

const baseState = {
  empty: false,
  loading: true,
};

describe('CertificateList Ecosystem', () => {
  it('should render the training certificate list page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<CertificateList />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should update empty and loading state', () => {
    const expectedState = { ...baseState, empty: true, loading: false };

    const result = shallow(<CertificateList />);
    const instance = result.instance();
    instance.onLoadFinished(true, false);

    expect(instance.state).toEqual(expectedState);
  });
});
