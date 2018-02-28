import styled from 'styled-components';
import { gray150, gray300, gray700, gray890, blue100 } from 'styles/colors';
import { fw600, RobotoRegular } from 'styles/typography';

export const IndicatorWrapper = styled.li`
  list-style-type: none;
  position: relative;
`;

export const IndicatorWeightWrapper = styled.div`
  background: #333;
  border-radius: 5px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.15);
  color: #fff;
  font-family: ${RobotoRegular};
  height: 118px;
  left: 5px;
  position: absolute;
  text-align: center;
  top: 0;
  width: 118px;
  z-index: 1;
`;

export const IndicatorWeightLabel = styled.span`
  display: inline-block;
  font-size: 13px;
  margin: 25px 0 10px;
  text-transform: uppercase;
  width: 100%;
`;

export const IndicatorWeightValue = styled.span`
  display: inline-block;
  font-size: 40px;
  width: 100%;
`;

export const IndicatorTitle = styled.h4`
  color: ${blue100};
  font-size: 21px;
  margin: 0;
  padding-left: 145px;
`;

export const IndicatorContentWrapper = styled.div`
  font-family: ${RobotoRegular};
  margin-top: 25px;
`;

export const IndicatorTableHeader = styled.ul`
  display: inline-block;
  margin-top: 90px;
  padding: 0 20px 0 0;
  text-align: right;
  vertical-align: top;
  width: 110px;
`;

export const IndicatorTableHeaderItem = styled.li`
  display: inline-block;
  font-size: 14px;
  list-style-type: none;
  margin: 10px 0;
  text-transform: uppercase;
  width: 100%;
`;

export const IndicatorTableHeaderItemAccOrObj = IndicatorTableHeaderItem.extend`
  color: ${gray890};
  font-weight: ${fw600};
`;

export const IndicatorTableContentWapper = styled.div`
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
    top: 60px;
  }
`;

export const IndicatorTableContent = styled.ul`
  overflow-x: auto;
  padding: 10px 0;
  position: relative;
  vertical-align: top;
  white-space: nowrap;
  width: 100%;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    height: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${blue100};
    border-radius: 10px;
  }
`;

export const IndicatorTableItem = styled.li`
  display: inline-block;
  list-style-type: none;
  position: relative;
  text-align: center;
  white-space: initial;
  width: 95px;
`;

export const IndicatorTableItemSort = styled.div`
  color: ${gray150};
  font-size: 21px;
  margin-bottom: 15px;
  padding: 12px 0;
  position: relative;

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
`;

export const IndicatorTableItemContent = styled.div`
  display: inline-block;
  font-size: 13px;
`;

export const IndicatorTableItemTrashIcon = styled.a`
  cursor: pointer;
  display: inline-block;
  height: 12px;
  width: 12px;

  svg {
    fill: ${gray300};
  }
`;

export const IndicatorTableItemNumber = styled.span`
  display: inline-block;
  margin: 10px 0;
  width: 100%;
  color: ${gray700};
`;

export const IndicatorTableItemNumberAcc = IndicatorTableItemNumber.extend`
  color: ${gray890};
  font-weight: ${fw600};
  font-size: 16px;
`;

export const IndicatorTableItemNumberObj = IndicatorTableItemNumber.extend`
  color: ${gray890};
  font-weight: ${fw600};
`;
