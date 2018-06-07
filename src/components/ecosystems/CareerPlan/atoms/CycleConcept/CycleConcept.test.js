import React from 'react';
import { shallow } from 'enzyme';
import CycleConcept from './CycleConcept';

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides);

  const result = shallow(<CycleConcept {...props} />);

  return {
    props,
    result,
  };
};

describe('Cycle concept', () => {
  it('should render the concept label with the correctly props', () => {
    // given

    // when
    const { result } = setup({ concept: 'Excede' });

    // then
    expect(result).toMatchSnapshot();
  });

  it('should disable the tooltip when there is not a concept', () => {
    // given

    // when
    const { result } = setup({ concept: '' });

    // then
    expect(result.find('Tooltip').props().disabled).toBeTruthy();
  });
});
