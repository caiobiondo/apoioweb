import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { spSmall, spMedium, spPage } from 'styles/spacing';

export const Wrapper = {
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'center',
  overflowY: 'scroll',
};

export const cellStyle = {
  padding: '0px 30px',
  lineHeight: '50px',
};

export const TableWrapper = styled.div`
  table tr td:first-child div {
    opacity: 0;
    transition: all 0.2s ease;
  }

  tr {
    transition: all 0.2s ease;
    background: #ffffff;

    td:first-child .is-selected,
    td:first-child .is-selected * {
      opacity: 1;
    }
  }

  tr:hover {
    td:first-child div {
      opacity: 1;
    }

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

export const CustomerName = styled.div`
  display: flex;
`;

export const Avatar = styled.figure`
  display: block;
  border-radius: 100%;
  text-align: center;
  width: 50px;
  min-width: 50px;
  height: 50px;
  line-height: 54px;
  color: #fff;
  background: #f39919;
  margin-left: 0;
  overflow: hidden;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const NameLabel = styled.figure`
  display: block;
  height: 50px;
  line-height: 54px;
  margin-left: 0;
  margin-right: 0;
`;

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
