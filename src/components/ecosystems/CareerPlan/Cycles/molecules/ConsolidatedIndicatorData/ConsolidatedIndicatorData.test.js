import React from 'react';
import { shallow } from 'enzyme';
import { ConsolidatedIndicatorData } from './ConsolidatedIndicatorData';
jest.mock('components/ecosystems/CareerPlan/enums/IndicatorTypes', () => ({
  IndicatorTypesLabels: {
    test1: '1',
    test2: '2',
    test3: '3',
  },
}));

const setup = propOverrides => {
  const props = Object.assign({ cycle: { cycle: 1 } }, propOverrides);

  const result = shallow(<ConsolidatedIndicatorData {...props} />);

  return {
    props,
    result,
  };
};

describe('ConsolidatedIndicatorData', () => {
  describe('onClick method', () => {
    it('should show the popover if it is not a valid cycle', () => {
      // given
      const isValid = false;
      const eventMock = { preventDefault: jest.fn() };

      // when
      const { result } = setup({ isValid });
      const instance = result.instance();
      instance.onClick(eventMock);

      // then
      expect(eventMock.preventDefault).toBeCalled();
      expect(instance.state.showPopover).toBeTruthy();
    });

    it('should not show the popover if it is a valid cycle', () => {
      // given
      const isValid = true;
      const eventMock = { preventDefault: jest.fn() };

      // when
      const { result } = setup({ isValid });
      const instance = result.instance();
      instance.onClick(eventMock);

      // then
      expect(eventMock.preventDefault).not.toBeCalled();
      expect(instance.state.showPopover).toBeFalsy();
    });
  });

  describe('setNode method', () => {
    it('should set the given param as node', () => {
      // given
      const node = 'test';

      // when
      const { result } = setup({});
      const instance = result.instance();
      instance.setNode(node);

      // then
      expect(instance.cycleNode).toEqual(node);
    });
  });

  describe('getIndicatorNames method', () => {
    it('should return the values of IndicatorTypesLabels', () => {
      // given
      const node = 'test';
      const expectedNames = '1, 2, 3';

      // when
      const { result } = setup({});
      const instance = result.instance();
      const names = instance.getIndicatorNames(node);

      // then
      expect(names).toEqual(expectedNames);
    });
  });

  describe('render method', () => {
    it('should not render Popover if the item is not active', () => {
      // given

      // when
      const { result } = setup({ isActive: false });
      const popover = result.find('Popover');

      // then
      expect(popover.length).toBeFalsy();
    });

    it('should render Popover if the item is active', () => {
      // given

      // when
      const { result } = setup({ isActive: true });
      const popover = result.find('Popover');

      // then
      expect(popover.length).toBeTruthy();
    });

    it('should not render warningIcon if the item is not active', () => {
      // given

      // when
      const { result } = setup({ isActive: false });
      const popover = result.find('Icon[file="ico_warning_info"]');

      // then
      expect(popover.length).toBeFalsy();
    });

    it('should render warningIcon if the item is active', () => {
      // given

      // when
      const { result } = setup({ isActive: true });
      const popover = result.find('Icon[file="ico_warning_info"]');

      // then
      expect(popover.length).toBeTruthy();
    });
  });
});
