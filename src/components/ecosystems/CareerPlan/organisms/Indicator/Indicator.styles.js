import styled from 'styled-components';
import { gray150, gray700, gray890, blue100 } from 'styles/colors';
import { fw600, RobotoRegular } from 'styles/typography';

import { IndicatorTypesColors } from '../../IndicatorTypes.enum';
import { IndicatorConceptsColors } from '../../IndicatorConcepts.enum';
import { ApplyButtonHeight } from '../../molecules/IndicatorDataForm/IndicatorDataForm.styles';

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
  font-family: ${RobotoRegular};
  font-size: 13px;
  font-weight: ${fw600};
  padding: 10px;
  position: absolute;
  right: -10px;
  text-transform: uppercase;
  top: -10px;
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
`;

export const IndicatorTableHeaderItem = styled.li`
  display: inline-block;
  font-size: 14px;
  list-style-type: none;
  margin: 10px 0;
  text-transform: uppercase;
  width: 100%;
`;

export const IndicatorTableHeaderItemFeatured = IndicatorTableHeaderItem.extend`
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
    bottom: ${ApplyButtonHeight};
    box-shadow: 0px 4px 10px 0 rgba(0, 0, 0, 0.2);
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 80px;
  }
`;

export const IndicatorTableContent = styled.ul`
  overflow: hidden;
  padding: 30px 0 0;
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

export const IndicatorConceptList = styled.ul`
  padding: 0;
  position: relative;
`;

export const IndicatorConceptListItem = styled.li`
  color: ${gray700};
  font-size: 16px;
  list-style-type: none;
  margin: 20px 0;
  padding-left: 35px;
  position: relative;

  &:before {
    border-radius: 2px;
    content: '';
    display: block;
    height: 15px;
    left: 0;
    position: absolute;
    width: 15px;

    ${({ concept }) => `
      background-color: ${IndicatorConceptsColors[concept.value]}
    `};
  }

  > span {
    &:first-child {
      text-transform: uppercase;

      :after {
        content: '......';
        color: ${gray150};
        display: inline-block;
        line-height: 10px;
        padding: 0 10px;
        vertical-align: top;
      }
    }
  }
`;
