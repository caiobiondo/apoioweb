import styled from 'styled-components';
import { gray150, gray300, gray700, gray890, blue100 } from 'styles/colors';
import { fw600 } from 'styles/typography';

export const IndicatorDataWrapper = styled.li`
  display: inline-block;
  list-style-type: none;
  position: relative;
  text-align: center;
  white-space: initial;
  width: 95px;
`;

export const IndicatorDataWrapperActive = IndicatorDataWrapper.extend`
  background: #fff;
  box-shadow: 0px 5px 35px 0 rgba(0, 0, 0, 0.1);
  border-radius: 15px 15px 0 0;

  &:before {
    background-color: #f4f3f3;
    content: '';
    height: 50px;
    left: -2px;
    position: absolute;
    width: 2px;
  }
`;

export const IndicatorDataSort = styled.div`
  color: ${gray150};
  font-size: 21px;
  margin-bottom: 15px;
  padding: 12px 0;
  position: relative;

  ${({ active }) =>
    !active &&
    `
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 1px;
      background-color: ${gray150};
    }

    &:after {
      background-color: white;
      bottom: 0;
      content: '';
      display: block;
      position: absolute;
      right: 1px;
      top: 0;
      width: 1px;
    }
  `};
`;

export const IndicatorDataSortCurrent = styled.span`
  background-color: ${blue100};
  border-radius: 5px;
  color: white;
  font-size: 10px;
  font-weight: ${fw600};
  left: 18px;
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

export const IndicatorDataNumber = styled.span`
  display: inline-block;
  margin: 10px 0;
  width: 100%;
  color: ${gray700};
`;

export const IndicatorDataNumberAcc = IndicatorDataNumber.extend`
  color: ${gray890};
  font-weight: ${fw600};
  font-size: 16px;
`;

export const IndicatorDataNumberObj = IndicatorDataNumber.extend`
  color: ${gray890};
  font-weight: ${fw600};
`;
