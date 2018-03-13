import React from 'react';
import { shallow } from 'enzyme';
import { ListTable } from './ListTable';

const setup = propOverrides => {
  const intl = {
    formatMessage: value => `formatedMessage ${value}`,
  };

  const props = Object.assign(
    {
      user: {
        codigo: 1234,
      },
      stockProducts: [
        {
          name: 'Product 1',
        },
        {
          name: 'Product 2',
        },
        {
          name: 'Product 3',
        },
      ],
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      onLoadFinished: jest.fn(),
      intl,
    },
    propOverrides,
  );

  const result = shallow(<ListTable {...props} />);

  return {
    props,
    result,
  };
};

describe('Training Courses List', () => {
  it('renders correctly when the list is not empty', () => {
    // given
    // when
    const { result } = setup({ fetchMore: jest.fn(), loading: false });

    // then
    expect(result).toMatchSnapshot();
  });

  it('should notify onLoadFinished callback when not loading', () => {
    // given
    // when
    const { result, props } = setup({
      fetchMore: jest.fn(),
      loading: false,
    });
    result
      .instance()
      .componentWillReceiveProps({ loading: false, stockProducts: props.stockProducts });

    // then
    expect(props.onLoadFinished).toBeCalledWith(false, false);
  });

  it('should refetch items on product removal', () => {
    const refetch = jest.fn();
    const { result } = setup({ stockProducts: [], refetch, loading: false });
    const instance = result.instance();
    instance.onProductRemove();

    expect(refetch).toBeCalled();
  });
});
