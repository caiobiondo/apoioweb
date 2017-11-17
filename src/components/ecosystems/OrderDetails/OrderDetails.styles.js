import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium } from 'styles/spacing';

export const OrderDetails = styled.div`
  margin: ${spMedium};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: ${spMedium} 0;
  }
`;
