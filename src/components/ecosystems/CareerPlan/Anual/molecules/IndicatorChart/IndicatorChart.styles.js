import styled from 'styled-components';
import { gray150 } from 'styles/colors';

import { IndicatorTypesColors } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';

export const IndicatorChartWrapper = styled.div`
  left: 0;
  bottom: 20px;
  display: inline-block;
  height: 80px;
  position: absolute;
  text-align: left;

  ${({ width, indicatorType }) => `
    width: ${width};
  `};
`;

export const IndicatorChartStyles = ({ indicatorType }) => ({
  Group: {
    data: { strokeWidth: '1' },
  },
  CurrentYear: {
    data: { stroke: IndicatorTypesColors[indicatorType] },
  },
  PastYear: {
    data: { stroke: gray150 },
  },
});
