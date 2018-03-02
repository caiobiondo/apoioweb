import styled, { injectGlobal } from 'styled-components';
import { gray150, gray300, gray700, gray890, blue100 } from 'styles/colors';
import { fw600, RobotoRegular } from 'styles/typography';

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

export const IndicatorDataRowInput = styled.input`
  border: none;
  border-radius: 2px;
  padding: 5px 0;
  margin: 5px 0px;
  text-align: center;
  width: 100%;
  color: ${gray700};
  font-family: ${RobotoRegular};
  font-size: 13px;

  &:focus {
    outline: none;
    background: ${gray890};
    color: #fff;
  }

  &:disabled {
    background: #fff;
    cursor: pointer;
  }
`;

export const IndicatorDataWrapper = styled.li`
  cursor: pointer;
  display: inline-block;
  height: 240px;
  list-style-type: none;
  padding: 0 10px;
  position: relative;
  text-align: center;
  transition: all 0.2s ease-in;
  vertical-align: top;
  white-space: initial;
  width: 95px;

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

  ${IndicatorDataRowInput} {
    ${({ active }) =>
      active &&
      `
        box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
    `};
  }

  ${({ active }) =>
    active &&
    `
    background: #fff;
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
  left: 8px;
  padding: 7px 15px;
  position: absolute;
  text-transform: uppercase;
  top: -25px;
`;

export const IndicatorDataContent = styled.div`
  display: inline-block;
  font-size: 13px;
`;

export const IndicatorDataTrashIcon = styled.a`
  cursor: pointer;
  display: inline-block;
  height: 12px;
  width: 12px;

  svg {
    fill: ${gray300};
  }
`;

export const IndicatorDataRow = styled.div`
  display: inline-block;
  width: 100%;
  color: ${gray700};

  &:first-child {
    min-height: 45px;
    padding: 15px 0;
  }
`;

export const IndicatorDataRowAcc = IndicatorDataRow.extend`
  color: ${gray890};
  font-weight: ${fw600};
  font-size: 16px;
`;

export const IndicatorDataRowObj = IndicatorDataRow.extend`
  color: ${gray890};
  font-weight: ${fw600};
`;

export const IndicatorDataSimulatorLabel = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  color: ${gray890};
  font-weight: ${fw600};
`;

export const IndicatorDataValue = styled.span`
  display: inline-block;
  padding: 10px 0;
`;

export const PopoverStyles = {
  padding: '20px',
  maxWidth: '250px',
  color: gray700,
  fontSize: '14px',
  overflow: 'visible',
};

export const PopoverContent = styled.div`
  position: relative;
`;

export const PopoverArrow = styled.div`
  position: absolute;
  bottom: -60px;
  transform: translate(-50%, 0);
  left: 50%;
  width: 100px;
  height: 40px;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    background: #fff;
    transform: rotate(45deg);
    top: -50px;
    left: 25px;
    box-shadow: -1px -1px 10px 0px rgba(0, 0, 0, 0.5);
  }
`;

// Overwrite default behavior for Material-UI popover
injectGlobal`
.Popover > div {
  overflow: visible !important;
}
`;
