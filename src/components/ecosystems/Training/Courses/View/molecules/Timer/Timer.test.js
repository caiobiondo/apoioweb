import React from 'react';
import { shallow } from 'enzyme';
import { Timer } from './Timer';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

const setup = propOverrides => {
  const props = Object.assign(
    {
      seconds: 60,
      start: false,
      onFinish: jest.fn(),
    },
    propOverrides,
  );

  const result = shallow(<Timer {...props} />);

  return {
    props,
    result,
  };
};

fdescribe('Timer', () => {
  it('renders correctly', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  describe('when starting', () => {
    it('correctly starts countdown', () => {
      // given
      // when
      const { result, props } = setup();
      result.setProps({ start: true });

      // then
      expect(result.instance().interval).not.toBeNull();
      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      expect(result.state('remainingSeconds')).toBe(props.seconds);
    });
  });

  describe('when finishing', () => {
    it('correctly finishes countdown', () => {
      // given
      // when
      const { result, props } = setup();
      result.setProps({ start: true });
      jest.runTimersToTime(1000 * (props.seconds + 1));

      // then
      expect(props.onFinish).toHaveBeenCalled();
      expect(clearInterval).toHaveBeenCalled();
    });
  });
});
