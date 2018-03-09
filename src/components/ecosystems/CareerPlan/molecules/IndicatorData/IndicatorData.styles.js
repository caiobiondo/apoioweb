import styled, { injectGlobal } from 'styled-components';
import { gray150, blue100, gray400 } from 'styles/colors';
import { fw600 } from 'styles/typography';
import * as IndicatorDataFormComponents from '../../molecules/IndicatorDataForm/IndicatorDataForm.styles';

export const IndicatorDataContent = IndicatorDataFormComponents.IndicatorDataContent;
export const IndicatorDataRow = IndicatorDataFormComponents.IndicatorDataRow;
export const IndicatorDataRowFeatured = IndicatorDataFormComponents.IndicatorDataRowAcc;
export const IndicatorDataRowObj = IndicatorDataFormComponents.IndicatorDataRowObj;
export const IndicatorDataValue = IndicatorDataFormComponents.IndicatorDataValue;

export const IndicatorDataSort = styled.div`
  color: ${gray150};
  font-size: 21px;
  padding: 12px 0;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -10px;
    width: 1px;
    background-color: ${gray150};
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
  width: 110px;

  ${IndicatorDataSort} {
    ${({ active }) =>
      active &&
      `
      &:before,
      &:after {
        display: none;
      }
    `};
  }

  ${IndicatorDataFormComponents.IndicatorDataRowInput} {
    ${({ active }) =>
      active &&
      `
        box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
    `};
  }

  ${({ active }) =>
    active &&
    `
    background: ${gray400};
    box-shadow: 0px 5px 35px 0 rgba(0, 0, 0, 0.1);
    border-radius: 15px 15px 0 0;
    outline: none;
    z-index: 1;

    &:before {
      background-color: #f4f3f3;
      content: '';
      height: 50px;
      left: -2px;
      position: absolute;
      width: 2px;
      z-index: 1;
    }
  `};
`;

export const IndicatorDataSortCurrent = styled.span`
  background-color: ${blue100};
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

export const PopoverStyles = {
  color: '#777777',
  fontSize: '14px',
  maxWidth: '250px',
  overflow: 'visible',
  padding: '20px',
};

export const PopoverContent = styled.div`
  position: relative;
  text-align: center;
`;

export const PopoverArrow = styled.div`
  bottom: -60px;
  height: 40px;
  left: 50%;
  overflow: hidden;
  position: absolute;
  transform: translate(-50%, 0);
  width: 100px;

  // &:after {
  //   background: #fff;
  //   box-shadow: -1px -1px 10px 0px rgba(0, 0, 0, 0.5);
  //   content: '';
  //   height: 50px;
  //   left: 25px;
  //   position: absolute;
  //   top: -50px;
  //   transform: rotate(45deg);
  //   width: 50px;
  // }
`;

// Overwrite default behavior for Material-UI popover
injectGlobal`
.Popover > div {
  overflow: visible !important;
}
`;
