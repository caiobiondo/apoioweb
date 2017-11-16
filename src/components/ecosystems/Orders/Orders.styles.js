import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium } from 'styles/spacing';

export const scrolledContainer = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingBottom: spMedium,
};

export const Main = styled.div`
  display: flex;
  margin: ${spMedium};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: ${spMedium} 0;
  }
`;
