import React from 'react';
import { shallow } from 'enzyme';
import IndicatorData from './IndicatorData';

import { IndicatorTypes } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';

const setup = propOverrides => {
  const props = Object.assign(
    {
      indicatorData: {
        cycle: 1,
        concept: 'Excede',
      },
      setRef: () => {},
      showDetails: true,
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
    it('should call onClick prop when item was simulated', () => {
      // given
      const eventMock = { preventDefault: jest.fn() };
      const props = {
        indicatorData: { cycle: 1, concept: 'Excede' },
        onClick: jest.fn(),
        isSimulated: true,
      };

      // when
      const { result } = setup(props);
      const instance = result.instance();
      instance.onClick(eventMock);

      // then
      expect(props.onClick).toBeCalledWith(props.indicatorData);
      expect(eventMock.preventDefault).not.toBeCalled();
    });

    it('should not call onClick prop when the item was not simulated', () => {
      // given
      const eventMock = { preventDefault: jest.fn() };
      const props = {
        onClick: jest.fn(),
        isSimulated: false,
      };

      // when
      const { result } = setup(props);
      const instance = result.instance();
      instance.onClick(eventMock);

      // then
      expect(eventMock.preventDefault).toBeCalled();
    });
  });

  describe('onClose method', () => {
    it('should call onClose prop and stopPropagation', () => {
      // given
      const eventMock = { stopPropagation: jest.fn() };
      const props = {
        onClose: jest.fn(),
        isSimulated: true,
      };

      // when
      const { result } = setup(props);
      const instance = result.instance();
      instance.onClose(eventMock);

      // then
      expect(props.onClose).toBeCalled();
      expect(eventMock.stopPropagation).toBeCalled();
    });
  });

  describe('renderContent method', () => {
    it('should call renderConsolidatedData method when a indicatorType is given', () => {
      // given
      const props = {
        indicatorData: {
          cycle: 1,
          overcoming: { concept: 'Excede' },
        },
        indicatorType: IndicatorTypes.ScoresTotal,
        showDetails: true,
      };

      // when
      const { result } = setup(props);
      const contentNode = result.find('IndicatorDatastyles__IndicatorFloatContent');

      // then
      expect(contentNode).toMatchSnapshot();
    });

    it('should call renderConsolidatedData method when a indicatorType is not given', () => {
      // given
      const props = {
        indicatorData: { cycle: 1, concept: 'Excede' },
        showDetails: true,
      };

      // when
      const { result } = setup(props);
      const contentNode = result.find('IndicatorDatastyles__IndicatorFloatContent');

      // then
      expect(contentNode).toMatchSnapshot();
    });
  });
});
