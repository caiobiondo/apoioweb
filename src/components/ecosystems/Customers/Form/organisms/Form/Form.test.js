import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import 'jest-styled-components';

const setup = propOverrides => {
  const props = Object.assign(
    {
      values: {},
      setFieldValue: jest.fn(),
      handleSubmit: jest.fn(),
      history: {
        back: jest.fn(),
      },
      mutate: jest.fn(),
    },
    propOverrides,
  );

  const result = shallow(<Form {...props} />);

  return {
    props,
    result,
  };
};

describe('Form', () => {
  it('correctly renders the customer form', () => {
    const { result } = setup();

    expect(result).toMatchSnapshot();
  });
});
