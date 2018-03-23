import React from 'react';
import { shallow } from 'enzyme';
import { InfiniteScroll } from './InfiniteScroll';

jest.mock('utils/debounce', () => ({
  debounce: (method, time) => () => {
    method();
  },
}));

const setup = propOverrides => {
  const props = Object.assign(
    {
      onScroll: jest.fn(),
      hasMore: false,
      loading: false,
      debounce: 0,
      items: [],
    },
    propOverrides,
  );

  const result = shallow(
    <InfiniteScroll {...props}>
      <div>Test</div>
    </InfiniteScroll>,
  );

  return {
    props,
    result,
  };
};

describe('Infinite Scroll', () => {
  it('renders correctly when it is loading and there is no items', () => {
    // given
    // when
    const { result } = setup({ loading: true, items: null });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders correctly when it is an empty list', () => {
    // given
    // when
    const { result } = setup({ items: [] });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders correctly when there are items on the list', () => {
    // given
    // when
    const { result } = setup({ items: [{ id: 1 }] });

    // then
    expect(result).toMatchSnapshot();
  });

  it('should call a debounced method when onScroll is called', () => {
    // given
    const onScroll = jest.fn();
    // when
    const { result } = setup({ items: [], onScroll });
    const instance = result.instance();
    instance.onScroll();

    // then
    expect(onScroll).toBeCalled();
  });
});
