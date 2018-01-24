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
      mutate: jest.fn().mockReturnValue(Promise.resolve()),
      client: {
        query: jest.fn().mockReturnValue(
          Promise.resolve({
            data: {
              product: {
                description: 'new product',
                name: 'new product',
                price: '10',
                productId: '1',
              },
            },
          }),
        ),
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

describe('StockAddProductModal', () => {
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

  describe('when searching for a product', () => {
    it("loads a product by it's code", () => {
      // given
      const newProps = {
        opened: true,
      };
      const code = '1';

      // when
      const { props, result } = setup(newProps);
      result.instance().setState({ lastProductCode: code });
      result.instance().loadProduct(code);

      // then
      expect(props.client.query).toBeCalled();
    });

    describe('when there is no code', () => {
      it('does not load a product', () => {
        // given
        const newProps = {
          opened: true,
        };
        const code = null;

        // when
        const { props, result } = setup(newProps);
        result.instance().loadProduct(code);

        // then
        expect(props.client.query).not.toBeCalled();
      });
    });
  });

  describe('when submitting', () => {
    describe('on success', () => {
      it('adds the selected product to stock', () => {
        // given
        const product = {
          description: 'new product',
          name: 'new product',
          price: '10',
          productId: '1',
        };
        const newProps = {
          opened: true,
        };

        // when
        const { props, result } = setup(newProps);
        result.instance().setState({ loadedProduct: product });
        result.instance().onSubmit();

        // then
        expect(props.mutate).toBeCalled();
      });
    });

    describe('on failure', () => {
      it('opens feedback dialog', async () => {
        // given
        const product = {
          description: 'new product',
          name: 'new product',
          price: '10',
          productId: '1',
        };
        const newProps = {
          opened: true,
          mutate: jest.fn().mockReturnValue(Promise.reject()),
        };

        // when
        const { props, result } = setup(newProps);
        result.instance().setState({ loadedProduct: product });
        await result.instance().onSubmit();

        // then
        expect(props.mutate).toBeCalled();
        expect(result.instance().state.openFeedbackDialog).toBeTruthy();
      });
    });
  });
});
