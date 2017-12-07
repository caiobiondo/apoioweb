import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium } from 'styles/spacing';

export const OrderAddButtonContainer = styled.div`
  position: fixed;
  right: 42px;
  bottom: ${props => {
    return props.empty ? '20%' : '10%';
  }};
  z-index: 9999;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    right: ${spMedium};
  }
`;
