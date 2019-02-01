import styled from 'styled-components';
import { fs20, fs32, fw700, NaturaBold } from 'styles/typography';
import { Responsive } from '@entria/components';

export const TittleWrapper = styled.div`
  font-size: ${fs32};
  font-family: ${NaturaBold};
  font-weight: ${fw700};
  margin-top: 20px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    font-size: ${fs20};
  }
`;
