import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray300, white } from 'styles/colors';

export const WrapperStyle = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
  overflowY: 'scroll',
};

export const TableWrapper = styled.div`
  padding: 20px 20px;

  table tr td:first-child div {
    transition: all 0.2s ease;
  }

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
      width: 1px !important;
    }

    tr th:nth-child(2),
    tr td:nth-child(2) {
      display: table-cell;
    }

    td:first-child,
    td:first-child * {
      opacity: 1 !important;
    }
  }
`;
