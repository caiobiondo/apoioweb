import React from 'react';
import { NewCustomerForm } from './New';
import 'jest-styled-components';
import { mount } from 'testUtils';

const setup = propOverrides => {
  const props = Object.assign(
    {
      history: {
        back: jest.fn(),
      },
      mutate: jest.fn(),
    },
    propOverrides,
  );

  const result = mount(<NewCustomerForm {...props} />);

  return {
    props,
    result,
  };
};

describe('NewCustomerForm', () => {
  it('correctly renders the form', () => {
    const { result } = setup();

    expect(result).toMatchSnapshot();
  });
});
