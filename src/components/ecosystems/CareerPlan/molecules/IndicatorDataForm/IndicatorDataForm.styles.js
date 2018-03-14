import styled from 'styled-components';
import { gray150, gray300, gray700, gray890 } from 'styles/colors';
import { fw400, fw600, RobotoRegular } from 'styles/typography';
import InputNumber from 'components/ecosystems/CareerPlan/atoms/InputNumber';

export const IndicatorDataRowInput = styled(InputNumber)`
  border: none;
  border-radius: 2px;
  padding: 5px 0;
  margin: 5px 0px;
  text-align: center;
  width: 100%;
  color: ${gray700};
  font-family: ${RobotoRegular};
  font-size: 13px;
  position: relative;

  &:focus {
    outline: none;
    background: ${gray890};
    color: #fff;
    z-index: 1;
  }

  &:disabled {
    background: #fff;
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
  width: 12px;
  position: absolute;
  top: 20px;
  transform: translate(-50%, 0);
  left: 50%;

  svg {
    fill: ${gray300};
  }
`;

export const IndicatorDataRowInputWrapper = styled.div`
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
    `position: relative;

      svg {
        display: block;
      }
  `};
`;

export const IndicatorDataRow = styled.div`
  display: inline-block;
  width: 100%;
  color: ${gray700};
`;

export const IndicatorDataRowAcc = IndicatorDataRow.extend`
  color: ${gray890};
  font-weight: ${fw600};
  font-size: 16px;
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
  color: ${gray890};
  cursor: pointer;
  font-size: 11px;
  font-weight: ${fw400};
  padding: 8px 17px;
  text-transform: uppercase;
  transition: all 0.2s ease-in;
  position: absolute;
  left: 0;
  bottom: 5px;
  width: 100%;

  &:active {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    border-color: ${gray150};
    color: ${gray150};
  }
`;

export const ApplyButtonHeight = '32px';

export const IndicatorDataSimulatorLabel = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  color: ${gray890};
  font-weight: ${fw600};
  position: absolute;
  top: 20px;
  transform: translate(-50%, 0);
  left: 50%;
`;

export const IndicatorDataValue = styled.span`
  display: inline-block;
  padding: 10px 0;
`;
