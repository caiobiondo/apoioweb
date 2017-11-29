import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spSmall, spMedium, spPage } from 'styles/spacing';

export const Wrapper = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
  overflowY: 'scroll',
  margin: '24px 70px 24px 24px',
};

export const cellStyle = {
  padding: '30px 30px',
};

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
