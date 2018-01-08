import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray300, white } from 'styles/colors';
import { LoadingWrapperStyle } from 'styles/mixins';

export const LoadingWrapper = LoadingWrapperStyle;

export const WrapperStyle = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const StockInputWrapper = styled.div``;

export const StockProductInfoWrapper = styled.div`
  ${StockInputWrapper} {
    display: none;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    ${StockInputWrapper} {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const TableWrapper = styled.div`
  padding: 20px 20px;

  tr {
    transition: all 0.2s ease;
    background: ${white};
  }

  thead tr th {
    color: ${gray300} !important;
    font-size: 15px !important;
    font-weight: 400 !important;
    text-transform: uppercase;
  }

  tr th:last-child,
  tr td:last-child {
    width: 110px;
  }

  tbody tr:hover {
    background: #f6f6f6;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    tr td,
    tr th {
      display: none;
    }

    tr th:first-child,
    tr td:first-child {
      display: table-cell;
      border-bottom: 1px solid ${gray300};
    }
  }
`;

export const fullContainer = {
  height: '100%',
};
