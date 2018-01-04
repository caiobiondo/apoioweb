import styled from 'styled-components';
import { white } from 'styles/colors';

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: ${white};
    width: 30px;
    height: 30px;
  }
`;
