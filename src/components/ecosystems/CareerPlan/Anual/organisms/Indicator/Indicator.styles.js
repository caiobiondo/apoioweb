import styled from 'styled-components';

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
