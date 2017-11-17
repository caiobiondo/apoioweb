import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium, spPage } from 'styles/spacing';

export const scrolledContainer = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingBottom: spPage,
};

export const Main = styled.div`
  margin: ${spMedium} ${spPage} ${spMedium} ${spMedium};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: ${spMedium} 0;
  }
`;

export const OrderAddButtonContainer = styled.div`
  position: fixed;
  right: 42px;
  bottom: 65px;
  z-index: 9999;
`;
