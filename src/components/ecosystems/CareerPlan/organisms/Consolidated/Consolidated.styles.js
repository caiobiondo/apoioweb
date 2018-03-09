import styled from 'styled-components';
import { gray890, blue100 } from 'styles/colors';
import { fw600, RobotoRegular } from 'styles/typography';

export const ConsolidatedWrapper = styled.li`
  list-style-type: none;
  position: relative;
  margin-bottom: 80px;
`;

export const ConsolidatedWeightWrapper = styled.div`
  background: ${blue100};
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

export const ConsolidatedWeightLabel = styled.span`
  display: inline-block;
  font-size: 13px;
  margin: 30px 0 10px;
  text-transform: uppercase;
  width: 100%;
`;

export const ConsolidatedWeightValue = styled.span`
  display: inline-block;
  font-size: 40px;
  width: 100%;
`;

export const ConsolidatedTitle = styled.h4`
  color: ${blue100};
  font-size: 21px;
  margin: 0;
  padding-left: 155px;
`;

export const ConsolidatedContentWrapper = styled.div`
  font-family: ${RobotoRegular};
  margin-top: 10px;
`;

export const ConsolidatedTableHeader = styled.ul`
  display: inline-block;
  margin-top: 125px;
  padding: 0 20px 0 0;
  text-align: right;
  vertical-align: top;
  width: 110px;
`;

export const ConsolidatedTableHeaderItem = styled.li`
  display: inline-block;
  font-size: 14px;
  list-style-type: none;
  margin: 10px 0;
  text-transform: uppercase;
  width: 100%;
`;

export const ConsolidatedTableHeaderItemAccOrObj = ConsolidatedTableHeaderItem.extend`
  color: ${gray890};
  font-weight: ${fw600};
`;

export const ConsolidatedTableContentWapper = styled.div`
  display: inline-block;
  position: relative;
  width: calc(100% - 110px);
  height: 270px;

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
`;

export const ConsolidatedTableContent = styled.ul`
  overflow-x: auto;
  padding: 30px 0 10px;
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
