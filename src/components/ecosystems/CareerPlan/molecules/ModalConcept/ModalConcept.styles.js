import styled from 'styled-components';
import { gray150, gray700 } from 'styles/colors';

import { IndicatorConceptsColors } from 'components/ecosystems/CareerPlan/enums/IndicatorConcepts';

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
