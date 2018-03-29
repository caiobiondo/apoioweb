import React from 'react';
import { shallow } from 'enzyme';
import InputNumber from './InputNumber';

const setup = propOverrides => {
  const props = Object.assign(
    {
      name: 'test',
    },
    propOverrides,
  );

  const result = shallow(<InputNumber {...props} />);

  return {
    props,
    result,
  };
};

describe('InputNumber', () => {
  it('should render with the correctly props', () => {
    // given

    // when
    const { result } = setup({ disabled: false });

    // then
    expect(result).toMatchSnapshot();
  });

  describe('onValueChange method', () => {
    it('should call onChange prop with certain values', () => {
      // given
      const onChange = jest.fn();
      const eventMock = { preventDefault: jest.fn() };
      const expectedValue = { floatValue: 1.1 };

      // when
      const { result } = setup({ onChange });
      const instance = result.instance();
      instance.onValueChange(expectedValue, eventMock);

      // then
      expect(onChange).toBeCalledWith(expectedValue.floatValue, eventMock);
    });
  });
});
