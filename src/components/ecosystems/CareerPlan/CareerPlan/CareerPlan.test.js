import React from 'react';
import { shallow } from 'enzyme';
import { CareerPlan } from './CareerPlan';

import CareerPlanMenus from 'components/ecosystems/CareerPlan/enums/CareerPlanMenus';

const setup = propOverrides => {
  const props = Object.assign(
    {
      user: { codigo: 1 },
      client: {
        query: jest
          .fn()
          .mockReturnValue(
            Promise.resolve({ data: { consolidatedOvercoming: null, overcoming: [] } }),
          ),
      },
      consolidatedCycles: [],
    },
    propOverrides,
  );

  const result = shallow(<CareerPlan {...props} />);

  return {
    props,
    result,
  };
};

describe('CareerPlan', () => {
  it('should set the initial state correctly', () => {
    // given
    const expectedState = {
      activeMenu: CareerPlanMenus.CyclesFirstRange,
    };

    // when
    const { result } = setup({});
    const instance = result.instance();

    // then
    expect(instance.state).toEqual(expectedState);
  });

  describe('on componentWillReceiveProps method', () => {
    it('should set the indicators and the consolidate', async () => {
      // given
      const consolidatedCycles = [{ cycle: 1, overcoming: { value: 'excede' } }];
      const newProps = {
        loading: false,
        indicators: [{ indicatorType: 'scoresTotal' }],
        consolidatedCycles,
      };

      // when
      const { result } = setup({});
      const instance = result.instance();
      await instance.componentWillReceiveProps(newProps);

      // then
      expect(instance.state.indicators).toEqual(newProps.indicators);
      expect(instance.state.consolidatedCycles).toEqual(consolidatedCycles);
    });
  });

  describe('onMenuChange method', () => {
    it('should set the given menu as active', async () => {
      // given
      const menu = { id: 1 };

      // when
      const { result } = setup({});
      const instance = result.instance();
      instance.onMenuChange(menu);

      // then
      expect(instance.state.activeMenu).toEqual(menu.id);
    });
  });

  describe('on onIndicatorChange method', () => {
    it('should update the state with the new given value', async () => {
      // given
      const indicator = { indicatorType: 'scoresTotal', cycles: [] };
      const newIndicator = { indicatorType: 'scoresTotal', cycles: [{ cycle: 1, value: 1 }] };
      const indicators = [indicator];
      const expectedIndicators = [newIndicator];

      // when
      const { result } = setup({});
      const instance = result.instance();
      result.setProps({ indicators });
      instance.onIndicatorChange(newIndicator);

      // then
      expect(instance.state.indicators).toEqual(expectedIndicators);
    });
  });
});
