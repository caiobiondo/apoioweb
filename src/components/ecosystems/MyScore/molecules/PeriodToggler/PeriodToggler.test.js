import React from 'react';
import { shallow } from 'enzyme';
import PeriodToggler from './PeriodToggler';
import { ActiveButton } from './PeriodToggler.styles';
import 'jest-styled-components';

const setup = propOverrides => {
  const props = Object.assign(
    { activePeriod: 'current', changeSelectedPeriod: jest.fn() },
    propOverrides,
  );

  const result = shallow(<PeriodToggler {...props} />);

  return {
    props,
    result,
  };
};

describe('PeriodToggler', () => {
  it('renders a period toggler', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders a period toggler with last active period', () => {
    // given
    // when
    const { result } = setup({ activePeriod: 'last' });

    // then
    expect(result).toMatchSnapshot();
  });

  it('changes the selected period from last period', () => {
    // given
    const changeSelectedPeriod = jest.fn();
    const props = { activePeriod: 'last', changeSelectedPeriod };
    // when
    const { result } = setup(props);
    result.find(ActiveButton).simulate('click');

    // then
    expect(changeSelectedPeriod).toBeCalledWith('last');
  });

  it('changes the selected period from current period', () => {
    // given
    const changeSelectedPeriod = jest.fn();
    const props = { activePeriod: 'current', changeSelectedPeriod };
    // when
    const { result } = setup(props);
    result.find(ActiveButton).simulate('click');

    // then
    expect(changeSelectedPeriod).toBeCalledWith('current');
  });
});
