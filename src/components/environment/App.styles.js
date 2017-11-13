import styled from 'styled-components';
import { Responsive } from '@entria/components';

export const Main = styled.div`
  margin: 25px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: 0;
  }
`;
