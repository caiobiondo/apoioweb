import React from 'react';
import { shallow } from 'enzyme';
import OrderDatum from './OrderDatum';
import { OrderDatumValue, OrderDatumLabel } from './OrderDatum.styles';
import { FormattedMessage } from 'react-intl';
import 'jest-styled-components';

const setup = propOverrides => {
  const props = Object.assign({ type: '', label: '', value: '' }, propOverrides);

  const result = shallow(<OrderDatum {...props} />);

  return {
    props,
    result,
  };
};

describe('OrderDatum', () => {
  it('renders an order datum', () => {
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
    const expectedElement = result.find(OrderDatumLabel);

    // then
    expect(expectedElement).toHaveLength(0);
  });

  it('renders a value', () => {
    // given
    const value = 'randomValue';

    // when
    const { result } = setup({ value });
    const expectedElement = result.find(OrderDatumValue);

    // then
    expect(expectedElement).toHaveLength(1);
    expect(expectedElement.contains(value)).toBeTruthy();
  });

  it('does not render a value', () => {
    // given
    const value = '';

    // when
    const { result } = setup({ value });
    const expectedElement = result.find(OrderDatumValue);

    // then
    expect(expectedElement).toHaveLength(0);
  });

  it('renders children elements', () => {
    // given
    const childrenElements = <div />;

    // when
    const result = shallow(<OrderDatum>{childrenElements}</OrderDatum>);

    // then
    expect(result.contains(childrenElements)).toBeTruthy();
  });

  it('renders short wrapper', () => {
    // given
    const type = 'short';

    // when
    const { result } = setup({ type });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders medium wrapper', () => {
    // given
    const type = 'medium';

    // when
    const { result } = setup({ type });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders long wrapper', () => {
    // given
    const type = 'long';

    // when
    const { result } = setup({ type });

    // then
    expect(result).toMatchSnapshot();
  });
});
