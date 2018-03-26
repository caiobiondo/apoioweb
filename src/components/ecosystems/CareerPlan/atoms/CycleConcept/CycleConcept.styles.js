import styled from 'styled-components';
import { gray700 } from 'styles/colors';
import { RobotoRegular } from 'styles/typography';

import { IndicatorConceptsColors } from 'components/ecosystems/CareerPlan/enums/IndicatorConcepts';

export const CycleConceptWrapper = styled.div``;

export const CycleConceptValue = styled.span`
  background-color: white;
  border-radius: 3px;
  border: 1px solid ${gray700};
  display: inline-block;
  height: 7px;
  margin-top: 5px;
  width: 12px;

  ${({ concept }) =>
    concept &&
    `
    background: ${IndicatorConceptsColors[concept]};
    border: none;
  `};

  ${({ size }) =>
    size === 'large' &&
    `
    margin-bottom: 30px;
    height: 15px;
  `};
`;

export const ConceptTooltipWrapper = styled.div`
  padding: 10px 30px;
  font-family: ${RobotoRegular};
  text-transform: uppercase;
  font-size: 14px;
  color: ${gray700};

  ${CycleConceptValue} {
    margin: -3px 10px 0;
    vertical-align: middle;
  }
`;
