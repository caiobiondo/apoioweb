import styled from 'styled-components';
import { white } from 'styles/colors';
import { RowWithHalfInputs } from '../../Shared/Styles';

export const PhoneWrapper = styled.div`
  margin-bottom: 8px;
`;

export const RowWithButton = RowWithHalfInputs.extend`
  justify-content: space-between;

  & > * {
    width: 40%;
    display: inline-block;
    margin: 0;

    &:first-child {
      margin-right: 0;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: ${white};
    width: 15px;
    height: 15px;
  }
`;

export const RemoveButton = {
  alignSelf: 'flex-end',
  height: 40,
  width: 40,
  marginBottom: 12,
};
