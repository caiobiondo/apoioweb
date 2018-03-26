import styled from 'styled-components';
import { gray150, gray300, gray700, gray890 } from 'styles/colors';
import { fw400, fw600, RobotoRegular } from 'styles/typography';
import InputNumber from 'components/ecosystems/CareerPlan/Cycles/atoms/InputNumber';

import { IndicatorConceptsColors } from 'components/ecosystems/CareerPlan/enums/IndicatorConcepts';

export const IndicatorDataRowInput = styled(InputNumber)`
  border-radius: 2px;
  border: none;
  color: ${gray700};
  font-family: ${RobotoRegular};
  font-size: 13px;
  margin: 5px 0px;
  padding: 5px 0;
  position: relative;
  text-align: center;
  width: 100%;

  &:focus {
    background: ${gray890};
    color: white;
    outline: none;
    z-index: 1;
  }

  &:disabled {
    background: white;
    cursor: pointer;
  }

  ${({ props, value }) =>
    !props.isActive &&
    !value &&
    `
    visibility: hidden;
  `};
`;

export const IndicatorDataContent = styled.div`
  display: inline-block;
  font-size: 13px;
  padding: 45px 0;
  position: relative;
`;

export const IndicatorDataTrashIcon = styled.a`
  cursor: pointer;
  display: inline-block;
  height: 12px;
  left: 50%;
  position: absolute;
  top: 20px;
  transform: translate(-50%, 0);
  width: 12px;

  svg {
    fill: ${gray300};
  }
`;

export const IndicatorDataRowInputWrapper = styled.div`
  position: relative;

  svg {
    display: none;
    height: 10px;
    position: absolute;
    right: 5px;
    top: 12px;
    z-index: 0;
  }

  ${({ isActive, empty }) =>
    isActive &&
    empty &&
    `
    svg {
      display: block;
    }
  `};
`;

export const IndicatorDataRow = styled.div`
  color: ${gray700};
  display: inline-block;
  width: 100%;
`;

export const IndicatorDataRowConcept = styled(IndicatorDataRow)`
  ${({ concept }) => `
    color: ${IndicatorConceptsColors[concept] || gray700};
    font-weight: bold;
    min-height: 45px;
    text-transform: uppercase;
  `};
`;

export const IndicatorDataRowAcc = IndicatorDataRow.extend`
  color: ${gray890};
  font-size: 16px;
  font-weight: ${fw600};
  min-height: 35px;
`;

export const IndicatorDataRowObj = IndicatorDataRow.extend`
  color: ${gray890};
  font-weight: ${fw600};
`;

export const IndicatorDataApplyButton = styled.button`
  background: transparent;
  border-radius: 4px;
  border: 1px solid ${gray890};
  bottom: 5px;
  color: ${gray890};
  cursor: pointer;
  font-size: 11px;
  font-weight: ${fw400};
  left: 0;
  padding: 8px 0;
  position: absolute;
  text-transform: uppercase;
  transition: all 0.2s ease-in;
  width: 100%;

  &:active,
  &:focus {
    outline: none;
  }

  &:disabled {
    border-color: ${gray150};
    color: ${gray150};
    cursor: not-allowed;
  }
`;

export const ApplyButtonHeight = '32px';

export const IndicatorDataSimulatorLabel = styled.span`
  color: ${gray890};
  font-size: 11px;
  font-weight: ${fw600};
  left: 50%;
  position: absolute;
  text-transform: uppercase;
  top: 20px;
  transform: translate(-50%, 0);
`;

export const IndicatorDataValue = styled.span`
  display: inline-block;
  padding: 10px 0;
`;
