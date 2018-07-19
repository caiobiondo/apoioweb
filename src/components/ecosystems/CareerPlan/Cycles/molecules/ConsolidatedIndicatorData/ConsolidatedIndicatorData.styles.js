import styled from 'styled-components';
import { gray200 } from 'styles/colors';

export const ConsolidateWarningIcon = styled.div`
  cursor: pointer;
  left: 50%;
  position: absolute;
  top: calc(50% + 20px);
  transform: translate(-50%, -50%);

  svg {
    fill: ${gray200};
    height: 18px;
    width: 18px;
  }
`;
