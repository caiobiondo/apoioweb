import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spSmall, spMedium, spPage } from 'styles/spacing';

export const List = styled.ul`
  padding-left: 0;
  padding-top: ${spMedium};
  margin: ${spMedium};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: ${spSmall};
  }
`;

export const LoadingWrapper = styled.div`
  text-align: center;
`;

export const scrolledContainer = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingBottom: spPage,
};

export const fullContainer = {
  height: '100%',
};
