import styled from 'styled-components';
import { gray150, gray400, gray700, gray890 } from 'styles/colors';
import { fw600, RobotoRegular } from 'styles/typography';
import * as IndicatorDataFormComponents from '../../molecules/IndicatorDataForm/IndicatorDataForm.styles';
import { IndicatorTypesColors } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';

export const IndicatorDataContent = IndicatorDataFormComponents.IndicatorDataContent;
export const IndicatorDataRow = IndicatorDataFormComponents.IndicatorDataRow;
export const IndicatorDataRowFeatured = IndicatorDataFormComponents.IndicatorDataRowAcc;
export const IndicatorDataRowObj = IndicatorDataFormComponents.IndicatorDataRowObj;
export const IndicatorDataValue = IndicatorDataFormComponents.IndicatorDataValue;

export const IndicatorDataSortCurrent = styled.span`
  border-radius: 5px;
  color: white;
  font-size: 10px;
  font-weight: ${fw600};
  left: 50%;
  padding: 7px 15px;
  position: absolute;
  text-transform: uppercase;
  top: -25px;
  transform: translate(-50%, 0);
`;

export const IndicatorDataSort = styled.div`
  color: ${gray150};
  font-size: 21px;
  padding: 12px 0;
  position: relative;

  &:before,
  &:after {
    bottom: 0;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 1px;
  }

  &:before {
    background-color: ${gray150};
    right: -10px;
  }

  &:after {
    background-color: white;
    right: -11px;
  }
`;

export const IndicatorFloatContent = styled.div`
  background: white;
  border-radius: 10px;
  bottom: -15px;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
  left: 50%;
  min-width: 80px;
  position: absolute;
  top: -15px;
  transform: translate(-50%, 0);
  width: 150%;
`;

export const IndicatorFloatContentClose = styled.a`
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 7.1px 0.4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-block;
  height: 30px;
  position: absolute;
  right: -10px;
  top: -10px;
  width: 30px;

  svg {
    fill: ${gray700};
    height: 30px;
    width: 10px;
  }
`;

export const IndicatorDataSortNumber = styled.span`
  font-size: 21px;
  padding: 25px 0 20px;
  display: inline-block;
`;

export const IndicatorDataSmallLabel = styled.span`
  font-size: 11px;
  display: block;
  text-transform: uppercase;
`;
export const IndicatorDataSmallValue = styled.span`
  font-size: 11px;
  display: block;
  font-weight: ${fw600};
  margin-bottom: 10px;
`;

export const IndicatorDataWrapper = styled.li`
  cursor: pointer;
  display: inline-block;
  list-style-type: none;
  padding: 0 10px;
  position: relative;
  text-align: center;
  transition: all 0.2s ease-in;
  transition-property: background, box-shadow, border-radius;
  vertical-align: top;
  white-space: initial;
  width: ${({ size }) => size || '10'}%;
  z-index: 0;

  ${({ isActive }) =>
    isActive &&
    `
    background: ${gray400};
    border-radius: 15px 15px 5px 5px;
    box-shadow: 0px 5px 35px 0 rgba(0, 0, 0, 0.1);
    cursor: default;
    outline: none;
    z-index: 1;

    &:not(:first-child) {
      &:before {
        background-color: #f4f3f3;
        content: '';
        height: 50px;
        left: -2px;
        position: absolute;
        width: 3px;
        z-index: 1;
      }
    }
  `};

  &:last-child {
    ${IndicatorDataSort} {
      &:before,
      &:after {
        display: none;
      }
    }
  }

  &:hover {
    ${({ isActive, editable }) =>
      !isActive &&
      editable &&
      `
      &:after {
        bottom: 0;
        box-shadow: 0px 5px 15px 0 rgba(0,0,0,0.1);
        content: '';
        left: 0;
        position: absolute;
        right: 0;
        top: 50px;
        z-index: -1;
      }
    `};
  }

  ${({ showDetails }) => showDetails && `z-index: 1;`};

  ${({ editable }) => !editable && `cursor: default;`};

  ${({ bordered }) => bordered && `border-right: 1px solid ${gray150}`};

  ${IndicatorDataSort} {
    ${({ isActive }) =>
      isActive &&
      `
      color: ${gray890};

      &:before,
      &:after {
        display: none;
      }
    `};

    ${({ bordered }) =>
      bordered &&
      `
      &:before,
      &:after {
        display: none;
      }
    `};
  }

  ${IndicatorDataSortCurrent} {
    ${({ indicatorType }) => `background-color: ${IndicatorTypesColors[indicatorType]}`};
  }

  ${IndicatorDataSortCurrent} {
    ${({ indicatorType }) => !indicatorType && `background-color: ${gray890}}`};
  }

  ${IndicatorDataSortNumber} {
    ${({ indicatorType }) => `color: ${IndicatorTypesColors[indicatorType]}}`};
  }

  ${IndicatorDataSmallLabel} {
    ${({ indicatorType }) => `color: ${IndicatorTypesColors[indicatorType]}}`};
  }

  ${IndicatorDataFormComponents.IndicatorDataRowInput} {
    ${({ isActive }) => isActive && `box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1); `};
  }
`;

export const PopoverStyles = {
  color: gray700,
  fontSize: '14px',
  maxWidth: '250px',
  overflow: 'visible',
  padding: '20px',
  fontFamily: RobotoRegular,
  lineHeight: '24px',
};

export const PopoverContent = styled.div`
  position: relative;
  text-align: center;
`;
