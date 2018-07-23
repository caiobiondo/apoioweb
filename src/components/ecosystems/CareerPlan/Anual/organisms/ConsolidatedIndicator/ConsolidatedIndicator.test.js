import React from 'react';
import { shallow } from 'enzyme';
import { ConsolidatedIndicator } from './ConsolidatedIndicator';

const setup = propOverrides => {
  const props = Object.assign(
    {
      concepts: [{ value: 'Excede' }],
    },
    propOverrides,
  );

  const result = shallow(<ConsolidatedIndicator {...props} />);

  return {
    props,
    result,
  };
};

describe('ConsolidatedIndicator', () => {
  it('should set the initial state correctly', () => {
    // given
    const expectedState = {
      informationModalOpened: false,
    };

    // when
    const { result } = setup({});
    const instance = result.instance();

    // then
    expect(instance.state).toEqual(expectedState);
  });

  describe('on openInformationModal method', () => {
    it('should set the informationModalOpened value to true', () => {
      // given

      // when
      const { result } = setup({});
      const instance = result.instance();
      instance.openInformationModal();

      // then
      expect(instance.state.informationModalOpened).toBeTruthy();
    });
  });

  describe('on closeInformationModal method', () => {
    it('should set the informationModalOpened value to false', () => {
      // given

      // when
      const { result } = setup({});
      const instance = result.instance();
      instance.closeInformationModal();

      // then
      expect(instance.state.informationModalOpened).toBeFalsy();
    });
  });

  describe('on setIndicatorDataNode method', () => {
    it('should set the given value as node', () => {
      // given
      const value = 'test';

      // when
      const { result } = setup({});
      const instance = result.instance();
      instance.setIndicatorDataNode(value);

      // then
      expect(instance.state.indicatorCycleNode).toEqual(value);
    });
  });

  describe('render method', () => {
    it('should render the cycles', () => {
      // given
      const props = {
        consolidatedCycles: [{ cycle: 1 }],
      };

      // when
      const { result } = setup(props);
      const cycle = result.find('IndicatorData');

      // then
      expect(cycle.length).toBeTruthy();
    });
  });

  describe('setActiveCycle method', () => {
    it('should set the cycle as active when clicked', () => {
      // given
      const cycle = 1;
      const props = {
        consolidatedCycles: [{ cycle }],
      };

      // when
      const { result } = setup(props);
      const instance = result.instance();
      instance.setActiveCycle(props.consolidatedCycles[0]);

      // then
      expect(instance.state.activeCycle).toEqual(cycle);
    });
  });

  describe('removeActiveCycle method', () => {
    it('should clear the active flag', () => {
      // given
      const cycle = 1;
      const props = {
        consolidatedCycles: [{ cycle }],
      };

      // when
      const { result } = setup(props);
      const instance = result.instance();
      instance.removeActiveCycle();

      // then
      expect(instance.state.activeCycle).toEqual(null);
    });
  });
});
