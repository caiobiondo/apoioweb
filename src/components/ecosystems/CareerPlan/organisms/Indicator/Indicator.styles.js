import styled from 'styled-components';
import { gray150, blue100 } from 'styles/colors';
import { RobotoRegular } from 'styles/typography';

export const IndicatorWrapper = styled.li`
  position: relative;
`;

export const IndicatorWeightWrapper = styled.div`
  background: #333;
  border-radius: 5px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.15);
  color: #fff;
  font-family: ${RobotoRegular};
  height: 118px;
  left: 0;
  position: absolute;
  text-align: center;
  top: 0;
  width: 118px;
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
  padding-left: 145px;
`;

export const IndicatorContentWrapper = styled.div`
  margin-top: 40px;
`;

export const IndicatorTableHeader = styled.ul`
  display: inline-block;
  width: 130px;
  padding: 0;
`;

export const IndicatorTableContent = styled.ul`
  display: inline-block;
  width: calc(100% - 130px);
  padding: 0;
  background: #fff;
  box-shadow: 0px 4px 10px 0 rgba(0, 0, 0, 0.2);
`;

export const IndicatorTableItem = styled.li`
  list-style-type: none;
  width: 95px;
  display: inline-block;
  text-align: center;
`;

export const IndicatorTableItemSort = styled.div`
  border-left: 1px solid ${gray150};
  border-right: 1px solid white;
  color: ${gray150};
  font-size: 21px;
  padding: 18px 40px;
`;

export const IndicatorTableItemContent = styled.div`
  display: inline-block;
`;

export const IndicatorTableItemTrashIcon = styled.span`
  background: #000;
  width: 12px;
  height: 12px;
  display: inline-block;
  visibility: hidden;
`;

export const IndicatorTableItemNumber = styled.span`
  display: inline-block;
  width: 100%;
  margin: 10px 0;
`;
