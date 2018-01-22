import React from 'react';
import { StockAddProductModal } from './StockAddProductModal';
import { shallow } from 'enzyme';
import user from './__mocks__/user.json';

jest.mock('lodash.debounce', () => jest.fn(fn => fn));

const setup = propOverrides => {
  const props = Object.assign(
    {
      user: user,
      opened: false,
      handleClose: jest.fn(),
      mutate: jest.fn(),
      client: {
        query: jest.fn(() => ({
          catch: jest.fn(() => ({
            then: jest.fn(),
          })),
          then: jest.fn(() => ({
            catch: jest.fn(),
          })),
        })),
      },
    },
    propOverrides,
  );

  const result = shallow(<StockAddProductModal {...props} />);

  return {
    props,
    result,
  };
};

fdescribe('StockAddProductModal', () => {
  it('renders correctly', () => {
    // given
    const props = {
      opened: true,
    };

    // when
    const { result } = setup(props);

    // then
    expect(result).toMatchSnapshot();
  });

  it("searchs for a product by it's code", () => {
    // given
    const newProps = {
      opened: true,
    };
    const code = '27715';

    // when
    const { props, result } = setup(newProps);
    result.instance().loadProduct(code);

    // then
    expect(props.client.query).toBeCalled();
  });
});
