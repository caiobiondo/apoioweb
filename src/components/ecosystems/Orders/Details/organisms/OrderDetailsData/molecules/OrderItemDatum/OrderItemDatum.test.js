import React from 'react';
import { shallow } from 'enzyme';
import OrderItemDatum from './OrderItemDatum';
import { OrderItemDatumValue } from './OrderItemDatum.styles';
import { FormattedMessage } from 'react-intl';

const setup = propOverrides => {
  const props = Object.assign({ label: '', value: '' }, propOverrides);

  const result = shallow(<OrderItemDatum {...props} />);

  return {
    props,
    result,
  };
};

describe('OrderItemDatum', () => {
  it('renders an order item datum', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders a label', () => {
    // given
    const messageId = 'randomFormarttedMessageId';

    // when
    const { result } = setup({ label: messageId });
    const expectedElement = result.find(FormattedMessage);

    // then
    expect(expectedElement).toHaveLength(1);
    expect(expectedElement.props().id).toEqual(messageId);
  });

  it('does not render a label', () => {
    // given
    const messageId = '';

    // when
    const { result } = setup({ label: messageId });
    const expectedElement = result.find(FormattedMessage);

    // then
    expect(expectedElement).toHaveLength(0);
  });

  it('renders a value', () => {
    // given
    const value = 'randomValue';

    // when
    const { result } = setup({ value });
    const expectedElement = result.find(OrderItemDatumValue);

    // then
    expect(expectedElement).toHaveLength(1);
    expect(expectedElement.contains(value)).toBeTruthy();
  });

  it('does not render a value', () => {
    // given
    const value = '';

    // when
    const { result } = setup({ value });
    const expectedElement = result.find(OrderItemDatumValue);

    // then
    expect(expectedElement).toHaveLength(0);
  });

  it('renders children elements', () => {
    // given
    const childrenElements = <div />;

    // when
    const result = shallow(<OrderItemDatum>{childrenElements}</OrderItemDatum>);

    // then
    expect(result.contains(childrenElements)).toBeTruthy();
  });
});
