import styled from 'styled-components';
import { gray300, gray700, gray890 } from 'styles/colors';
import { fw600, RobotoRegular } from 'styles/typography';
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
`;

export const IndicatorDataContent = styled.div`
  display: inline-block;
  font-size: 13px;
  padding-top: 45px;
  position: relative;

  ${({ active }) =>
    !active &&
    `padding-bottom: 45px;
  `};
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

  ${({ active, empty }) =>
    active &&
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
  border: 2px solid ${gray890};
  color: ${gray890};
  font-size: 11px;
  font-weight: ${fw600};
  padding: 8px 0;
  text-transform: uppercase;
  width: 100%;
  margin-bottom: 10px;
`;

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

export const IndicatorDataModalContent = {
  maxWidth: '460px',
};

export const IndicatorDataModalPaper = {
  style: { padding: '20px 5px' },
};

export const IndicatorDataModalTitle = {
  color: gray890,
  fontSize: 25,
  fontWeight: fw600,
};

export const IndicatorDataModalBody = {
  fontSize: 16,
  fontFamily: RobotoRegular,
};

export const IndicatorDataModalLabel = {
  fontWeight: fw600,
};
