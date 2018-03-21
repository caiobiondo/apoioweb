import styled from 'styled-components';
import { gray150 } from 'styles/colors';

import { IndicatorTypesColors } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';

export const IndicatorChartWrapper = styled.div`
  bottom: 40px;
  display: inline-block;
  height: 80px;
  left: 20px;
  position: absolute;
  text-align: left;
  z-index: 0;

  ${({ width, indicatorType }) => `
    width: ${width}px;
  `};
`;

export const IndicatorChartStyles = ({ indicatorType }) => ({
  Group: {
    data: { strokeWidth: '1' },
  },
  CurrentPeriod: {
    data: { stroke: IndicatorTypesColors[indicatorType] },
  },
  PastPeriod: {
    data: { stroke: gray150 },
  },
});
