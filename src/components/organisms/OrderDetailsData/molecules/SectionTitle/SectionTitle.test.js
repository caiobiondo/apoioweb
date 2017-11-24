import React from 'react';
import { shallow } from 'enzyme';
import SectionTitle from './SectionTitle';
import { FormattedMessage } from 'react-intl';

const setup = propOverrides => {
  const props = Object.assign({ iconName: '', value: '' }, propOverrides);

  const result = shallow(<SectionTitle {...props} />);

  return {
    props,
    result,
  };
};

describe('SectionTitle', () => {
  it('renders the section title', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders a formatted message', () => {
    // given
    const messageId = 'randomFormarttedMessageId';

    // when
    const { result } = setup({ value: messageId });
    const expectedElement = result.find(FormattedMessage);

    // then
    expect(expectedElement).toHaveLength(1);
    expect(expectedElement.props().id).toEqual(messageId);
  });

  it('does not render a formatted message', () => {
    // given
    const messageId = '';

    // when
    const { result } = setup({ value: messageId });
    const expectedElement = result.find(FormattedMessage);

    // then
    expect(expectedElement).toHaveLength(0);
  });
});
