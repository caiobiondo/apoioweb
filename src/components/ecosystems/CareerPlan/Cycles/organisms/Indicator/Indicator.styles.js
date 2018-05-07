import styled from 'styled-components';
import { orange100, gray150, gray450, gray500, gray700, gray890 } from 'styles/colors';
import { RobotoRegular, RobotoMedium } from 'styles/typography';

import { IndicatorTypesColors } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';
import { IndicatorDataWrapper } from '../../molecules/IndicatorData/IndicatorData.styles';

export const IndicatorWeightWrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.15);
  color: #fff;
  font-family: ${RobotoRegular};
  height: 125px;
  left: 5px;
  position: absolute;
  text-align: center;
  top: 0;
  width: 125px;
  z-index: 1;
`;

export const IndicatorTitle = styled.h4`
  font-size: 21px;
  margin: 0;
  padding-left: 155px;
`;

export const IndicatorWrapper = styled.li`
  list-style-type: none;
  position: relative;
  margin-bottom: 80px;
  display: inline-block;
  width: 100%;

  ${IndicatorWeightWrapper} {
    ${({ indicatorType }) => `
      background: ${IndicatorTypesColors[indicatorType]}
    `};

    ${({ indicatorType }) =>
      !indicatorType &&
      `
        background: ${gray890};
        background-image: url(/static/trophy.png);
      `};
  }

  ${IndicatorTitle} {
    ${({ indicatorType }) => `
      color: ${IndicatorTypesColors[indicatorType]}
    `};
  }
`;

export const IndicatorWeightLabel = styled.span`
  display: inline-block;
  font-size: 13px;
  margin: 30px 0 10px;
  text-transform: uppercase;
  width: 100%;
`;

export const IndicatorWeightValue = styled.span`
  display: inline-block;
  font-size: 40px;
  width: 100%;
`;

export const IndicatorInfo = styled.a`
  color: ${gray890};
  cursor: pointer;
  font-family: ${RobotoMedium};
  font-size: 13px;
  padding: 10px 0;
  position: absolute;
  right: 0;
  text-transform: uppercase;
  transition: color 0.1s ease-in;
  top: -10px;

  &:hover {
    color: ${orange100};
  }
`;

export const IndicatorContentWrapper = styled.div`
  font-family: ${RobotoRegular};
  margin-top: 10px;
`;

export const IndicatorTableHeader = styled.ul`
  display: inline-block;
  margin-top: 125px;
  padding: 0 20px 0 0;
  text-align: right;
  vertical-align: top;
  width: 110px;

  ${({ hasActions }) => hasActions && `margin-top: 132px;`};
`;

export const IndicatorTableHeaderItem = styled.li`
  color: ${gray700};
  display: inline-block;
  font-size: 14px;
  list-style-type: none;
  margin-bottom: 20px;
  text-transform: uppercase;
  width: 100%;
`;

export const IndicatorTableHeaderItemFeatured = IndicatorTableHeaderItem.extend`
  color: ${gray890};
  font-family: ${RobotoMedium};
`;

export const IndicatorTableContent = styled.ul`
  margin: 0;
  overflow: hidden;
  padding: 30px 10px 0;
  position: relative;
  vertical-align: top;
  white-space: nowrap;
  width: 100%;
`;

export const IndicatorTableContentWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: calc(100% - 110px);

  &:before {
    background-color: white;
    border-radius: 3px;
    bottom: 0;
    box-shadow: 0px 4px 10px 0 rgba(0, 0, 0, 0.2);
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 80px;
  }

  ${IndicatorDataWrapper} {
    ${({ hasChart }) => hasChart && ` padding-bottom: 90px;`};
  }

  ${IndicatorTableContent} {
    ${({ hasChart }) =>
      hasChart &&
      `
      overflow: visible;
      z-index: 1;
      padding-left: 20px;
    `};
  }
`;

export const IndicatorTableLegendItem = styled.li`
  list-style-type: none;
  margin-bottom: 20px;
  color: ${gray700};
  padding-left: 20px;
  display: inline-block;
  position: relative;

  &:before {
    content: '';
    display: block;
    width: 10px;
    height: 5px;
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: 5px;
    background-color: ${gray150};
  }
`;

export const IndicatorTableLegend = styled.ul`
  padding: 0;
  margin-top: 30px;
  font-size: 14px;

  ${IndicatorTableLegendItem} {
    &:first-child {
      &:before {
        ${({ indicatorType }) =>
          `background-color: ${IndicatorTypesColors[indicatorType] || gray700}}`};
      }
    }
  }
`;

export const IndicatorSaveButtonWrapper = styled.div`
  margin-top: 30px;
  text-align: right;
`;

export const IndicatorSaveButton = styled.button`
  appearance: none;
  background-color: ${gray450};
  border-radius: 4px;
  border: none;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  color: ${orange100};
  cursor: pointer;
  display: inline-block;
  padding: 20px 30px;
  text-transform: uppercase;
  transition: 0.2s box-shadow ease-in;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.15);
  }
`;
