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
    it('should get the consolidated overcoming data and set the newIndicators', async () => {
      // given
      const consolidatedOvercoming = [{ cycle: 1, value: 'excede' }];
      const expectedConsolidatedOvercoming = {
        data: { consolidatedOvercoming },
      };
      const newProps = { loading: false, indicators: [{ indicatorType: 'scoresTotal' }] };
      const props = {
        client: {
          query: jest.fn().mockReturnValue(Promise.resolve(expectedConsolidatedOvercoming)),
        },
      };

      // when
      const { result } = setup(props);
      const instance = result.instance();
      await instance.componentWillReceiveProps(newProps);

      // then
      expect(instance.state.indicators).toEqual(newProps.indicators);
      expect(instance.state.consolidatedCycles).toEqual(consolidatedOvercoming);
      expect(props.client.query).toBeCalled();
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

  describe('on updateCycle method', () => {
    it('should update the state with the new given value', async () => {
      // given
      const newCycle = { cycle: 1, value: 2 };
      const indicator = { indicatorType: 'scoresTotal', cycles: [{ cycle: 1, value: 1 }] };
      const indicators = [indicator];
      const expectedIndicators = [{ ...indicator, cycles: [newCycle] }];

      // when
      const { result } = setup({});
      const instance = result.instance();
      result.setProps({ indicators });
      instance.updateCycle({ cycle: newCycle, indicatorType: indicator.indicatorType });

      // then
      expect(instance.state.indicators).toEqual(expectedIndicators);
    });

    it('should call the cb property', async () => {
      // given
      const callback = jest.fn();
      const newCycle = { cycle: 1, value: 2 };
      const indicator = { indicatorType: 'scoresTotal', cycles: [{ cycle: 1, value: 1 }] };
      const indicators = [indicator];

      // when
      const { result } = setup({});
      const instance = result.instance();
      result.setProps({ indicators });
      instance.updateCycle({ cycle: newCycle, indicatorType: indicator.indicatorType }, callback);

      // then
      expect(callback).toBeCalled();
    });
  });

  describe('on fetchOvercoming method', async () => {
    it('should get the overcoming data for the specific cycle and update the state', async () => {
      // given
      const cycle = { cycle: 1, naturaNetwork: 1, directSale: 1 };
      const indicator = { indicatorType: 'scoresTotal', cycles: [cycle] };
      const indicators = [indicator];
      const overcoming = { overcoming: 1 };
      const expectedOvercoming = {
        data: { overcoming: [overcoming] },
      };
      const expectedIndicators = [{ ...indicator, cycles: [{ ...cycle, overcoming }] }];
      const props = {
        client: {
          query: jest.fn().mockReturnValue(Promise.resolve(expectedOvercoming)),
        },
      };

      // when
      const { result } = setup(props);
      const instance = result.instance();
      result.setProps({ indicators });
      await instance.fetchOvercoming({ cycle, indicatorType: indicator.indicatorType });

      // then
      expect(instance.state.indicators).toEqual(expectedIndicators);
    });

    it('should only update the state with erased overcoming when there are no inputed values', async () => {
      // given
      const cycle = { cycle: 1, naturaNetwork: 0, directSale: 0 };
      const indicator = { indicatorType: 'scoresTotal', cycles: [cycle] };
      const indicators = [indicator];
      const newCycle = { ...cycle, overcoming: null };
      const expectedIndicators = [{ ...indicator, cycles: [newCycle] }];

      // when
      const { result } = setup({});
      const instance = result.instance();
      result.setProps({ indicators });
      await instance.fetchOvercoming({ cycle, indicatorType: indicator.indicatorType });

      // then
      expect(instance.state.indicators).toEqual(expectedIndicators);
    });
  });
});
