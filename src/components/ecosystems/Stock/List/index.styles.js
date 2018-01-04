import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spMedium, spPage } from 'styles/spacing';
import { Full } from 'styles/mixins';

export const Main = styled.div`
  margin: ${spMedium} ${spPage} ${spMedium} ${spMedium};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin: ${spMedium} 0;
  }

  ${props => {
    return props.loading || props.empty ? Full : null;
  }};
`;

export const StockSearchContainer = styled.div`
  margin-bottom: ${spMedium};
`;

export const StockAddButtonContainer = styled.div`
  position: fixed;
  right: 42px;
  bottom: ${props => {
    return props.empty ? '24%' : '12%';
  }};
  z-index: 9999;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    right: ${spMedium};
  }
`;
