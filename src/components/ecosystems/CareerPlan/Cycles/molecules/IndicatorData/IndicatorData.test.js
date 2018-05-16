import React from 'react';
import { shallow } from 'enzyme';
import { IndicatorData } from './IndicatorData';

import { IndicatorTypes } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';

const setup = propOverrides => {
  const props = Object.assign(
    {
      indicator: { indicatorType: IndicatorTypes.ScoresTotal },
      indicatorData: { cycle: 1 },
    },
    propOverrides,
  );

  const result = shallow(<IndicatorData {...props} />);

  return {
    props,
    result,
  };
};

describe('IndicatorData', () => {
  describe('onClick method', () => {
    it('should show the popover if it is not a closed cycle and it needs to be filled', () => {
      // given
      const eventMock = { preventDefault: jest.fn() };

      // when
      const { result } = setup({ canFill: false });
      const instance = result.instance();
      instance.onClick(eventMock);

      // then
      expect(eventMock.preventDefault).toBeCalled();
      expect(instance.state.showPopover).toBeTruthy();
    });

    it('should not show the popover if it is a valid cycle', () => {
      // given
      const onClick = jest.fn();
      const indicatorData = { cycle: 1, isClosed: false };
      const eventMock = { preventDefault: jest.fn() };

      // when
      const { result } = setup({ onClick, indicatorData, canFill: true });
      const instance = result.instance();
      instance.onClick(eventMock);

      // then
      expect(eventMock.preventDefault).not.toBeCalled();
      expect(instance.state.showPopover).toBeFalsy();
      expect(onClick).toBeCalledWith(indicatorData);
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
      expect(instance.indicatorDataNode).toEqual(node);
    });
  });

  describe('render method', () => {
    it('should not render Popover if the item is not closed', () => {
      // given
      const indicatorData = {
        cycle: 1,
        overcoming: { concept: 'value' },
        isClosed: true,
      };

      // when
      const { result } = setup({ indicatorData });
      const popover = result.find('CareerPlanPopover');

      // then
      expect(popover.length).toBeFalsy();
    });

    it('should render Popover if the item is closed', () => {
      // given
      const indicatorData = { cycle: 1, isClosed: false };

      // when
      const { result } = setup({ indicatorData });
      const popover = result.find('CareerPlanPopover');

      // then
      expect(popover.length).toBeTruthy();
    });

    it('should not render the current label if the item is not the current one', () => {
      // given

      // when
      const { result } = setup({ isCurrentCycle: false });
      const currentLabel = result.find('IndicatorDatastyles__IndicatorDataSortCurrent');

      // then
      expect(currentLabel.length).toBeFalsy();
    });

    it('should render the current label if the item is the current one', () => {
      // given

      // when
      const { result } = setup({ isCurrentCycle: true });
      const currentLabel = result.find('IndicatorDatastyles__IndicatorDataSortCurrent');

      // then
      expect(currentLabel.length).toBeTruthy();
    });
  });
});
