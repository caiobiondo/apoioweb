import styled from 'styled-components';
import { gray150, gray400, gray700, gray890 } from 'styles/colors';
import { fw600 } from 'styles/typography';
import * as IndicatorDataFormComponents from '../../molecules/IndicatorDataForm/IndicatorDataForm.styles';
import { IndicatorTypesColors } from '../../IndicatorTypes.enum';

export const IndicatorDataContent = IndicatorDataFormComponents.IndicatorDataContent;
export const IndicatorDataRow = IndicatorDataFormComponents.IndicatorDataRow;
export const IndicatorDataRowFeatured = IndicatorDataFormComponents.IndicatorDataRowAcc;
export const IndicatorDataRowObj = IndicatorDataFormComponents.IndicatorDataRowObj;
export const IndicatorDataValue = IndicatorDataFormComponents.IndicatorDataValue;
export const IndicatorDataConceptValue = IndicatorDataFormComponents.IndicatorDataConceptValue;

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

  &:before {
    background-color: ${gray150};
    bottom: 0;
    content: '';
    display: block;
    position: absolute;
    right: -10px;
    top: 0;
    width: 1px;
  }

  &:after {
    background-color: white;
    bottom: 0;
    content: '';
    display: block;
    position: absolute;
    right: -11px;
    top: 0;
    width: 1px;
  }
`;

export const IndicatorDataWrapper = styled.li`
  cursor: pointer;
  display: inline-block;
  list-style-type: none;
  padding: 0 10px;
  position: relative;
  text-align: center;
  transition: all 0.2s ease-in;
  vertical-align: top;
  white-space: initial;
  width: 10%;
  z-index: 0;

  ${({ isActive }) =>
    isActive &&
    `
    background: ${gray400};
    border-radius: 15px 15px 0 0;
    box-shadow: 0px 5px 35px 0 rgba(0, 0, 0, 0.1);
    cursor: default;
    outline: none;
    z-index: 1;

    &:before {
      background-color: #f4f3f3;
      content: '';
      height: 50px;
      left: -2px;
      position: absolute;
      width: 3px;
      z-index: 1;
    }
  `};

  ${({ editable }) => !editable && `cursor: default;`};

  &:hover {
    ${({ isActive, indicatorType, editable }) =>
      !isActive &&
      editable &&
      `
      &:after {
        bottom: 20px;
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
  }

  ${IndicatorDataSortCurrent} {
    ${({ indicatorType }) => `background-color: ${IndicatorTypesColors[indicatorType]}`};
  }

  ${IndicatorDataSortCurrent} {
    ${({ indicatorType }) => !indicatorType && `background-color: ${gray890}}`};
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
};

export const PopoverContent = styled.div`
  position: relative;
  text-align: center;
`;
